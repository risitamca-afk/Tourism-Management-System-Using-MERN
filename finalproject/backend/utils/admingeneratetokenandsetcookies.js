import jwt from "jsonwebtoken";

// in this fn we are besically create an web token  and lets create a secret first because need it
export const admingenerateTokenAndSetCookie = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, //for 1 days
  });
  return token;
};
