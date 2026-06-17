import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { Admin } from "../models/admin.model.js";
import { admingenerateTokenAndSetCookie } from "../utils/admingeneratetokenandsetcookies.js";
//done
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    //check all the filds are filled
    if (!email || !password || !name) {
      throw new Error("All Fields Are Required");
    }
    //check if the user is already exist or not
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }
    //creat the hashed password
    const hashedPassword = await bcryptjs.hash(password, 10);
    //creat a verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    //creating  new users
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokeneExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    //saving the user to the databse
    await user.save();

    // creating a token and set  a cookie which says that the user is now been authenticated
    // jwt token
    generateTokenAndSetCookie(res, user._id);

    //creating a verification email function here we are sendin code to the user mail and then they verify there accunt with that code
    await sendVerificationEmail(user.email, verificationToken);

    //send a response sos that we can find the user created successfully and show the user details
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      //show the user details
      // way 1
      // user: {
      //     _id: user._id,
      //     email: user.email,
      //     name:user.name,
      // }
      //way to view all the fields except some fields like password and other importent
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
//done
export const verifyEmail = async (req, res) => {
  //1 2 3 4 5 6
  const { code } = req.body;
  try {
    //checking for uder verification code
    const user = await User.findOne({
      verificationToken: code,
      verificationTokeneExpiresAt: { $gt: Date.now() },
    });
    //if user is not valid
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expire Verification Token",
      });
    }
    //make the user verified and remove the verification token from the database
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokeneExpiresAt = undefined;

    //save the user to the database
    await user.save();

    //now we are sending a welcome email to the user  and passing the user email and the user name so that we can get it into the mail
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error In verify-email", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//done
export const login = async (req, res) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;
  try {
    // Searching for a user in the database with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // Comparing provided password with the stored hashed password
    const ispasswordvalid = await bcryptjs.compare(password, user.password);
    if (!ispasswordvalid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // Generates an authentication token and sets it as a cookie in the response
    generateTokenAndSetCookie(res, user._id);
    // Updates the lastLogin field with the current date and time and save it to th database
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "LoginSuccessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
//done
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLINT_URL}/reset-password/${resetToken}`,
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, //IT WILL CALCULATE THE TIME
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expire Reset Token" });
    }
    //update the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    // save it to the database;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password Reset Successfully" });
  } catch (error) {
    console.log("Error in Reset Password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
//done
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
export const adminCheckAuth = async (req, res) => {
  try {
    const admin = await Admin.findById(req.userId).select("-password");
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Credentials" });
//     }

//     // Validate the password
//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Credentials" });
//     }

//     // Check if the username and password match the admin credentials in the environment variables
//     const adminUsername = process.env.ADMIN_USERNAME;
//     const adminPassword = process.env.ADMIN_PASSWORD;

//     if (
//       email === adminUsername &&
//       password === adminPassword // Password provided directly for demonstration; should compare hashes for security
//     ) {
//       // Generate token and set cookie
//       generateTokenAndSetCookie(res, user._id);

//       // Redirect to admin dashboard
//       return res.status(200).json({
//         success: true,
//         message: "Admin Login Successful",
//         user: {
//           ...user._doc,
//           password: undefined, // Exclude password from response
//         },
//         role: "admin",
//       });
//     }

//     // If admin credentials don't match, deny access
//     return res
//       .status(403)
//       .json({ success: false, message: "Admin Access Denied" });
//   } catch (error) {
//     console.error("Error in adminLogin:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// export const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Request Email:", email);
//     console.log("Request Password:", password);
//     console.log("Admin Username:", process.env.ADMIN_USERNAME);
//     console.log("Admin Password:", process.env.ADMIN_PASSWORD);

//     // Check if user exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Credentials" });
//     }

//     // Validate user password
//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Credentials" });
//     }

//     // Check admin credentials
//     const adminUsername = process.env.ADMIN_USERNAME;
//     const adminPassword = process.env.ADMIN_PASSWORD;

//     // Use bcrypt comparison for admin password
//     const isAdminPasswordValid = password === adminPassword; // Update to bcrypt if hashed
//     if (email === adminUsername && isAdminPasswordValid) {
//       generateTokenAndSetCookie(res, user._id);

//       return res.status(200).json({
//         success: true,
//         message: "Admin Login Successful",
//         user: { ...user._doc, password: undefined },
//         role: "admin",
//       });
//     }

//     return res
//       .status(403)
//       .json({ success: false, message: "Admin Access Denied" });
//   } catch (error) {
//     console.error("Error in adminLogin:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const adminSignup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    //check all the filds are filled
    if (!email || !password || !name) {
      throw new Error("All Fields Are Required");
    }
    //check if the user is already exist or not
    const adminAlreadyExists = await Admin.findOne({ email });
    if (adminAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Already Exists" });
    }
    //creat the hashed password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const admin = new Admin({
      email,
      password: hashedPassword,
      name,
    });

    //saving the user to the databse
    await admin.save();

    // creating a token and set  a cookie which says that the user is now been authenticated
    // jwt token
    // admingenerateTokenAndSetCookie(res, admin._id);
    //send a response sos that we can find the user created successfully and show the user details
    res.status(201).json({
      success: true,
      message: "Admin Created Successfully Carefull While Create Admin",
      admin: {
        ...admin._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const adminLogin = async (req, res) => {
  // Destructuring email and password from the request body
  const { email, password } = req.body;
  try {
    // Searching for a user in the database with the provided email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // Comparing provided password with the stored hashed password
    const ispasswordvalid = await bcryptjs.compare(password, admin.password);
    if (!ispasswordvalid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    // Generates an authentication token and sets it as a cookie in the response
    admingenerateTokenAndSetCookie(res, admin._id);
    // Updates the lastLogin field with the current date and time and save it to th database
    admin.lastLogin = new Date();
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin Login Successfully",
      admin: {
        ...admin._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in admin login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
//done
export const adminLogout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: " Admin Logged out successfully" });
};
