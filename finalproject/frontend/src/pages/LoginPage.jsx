import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useAuthStore } from "../store/auth.store";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div
      className="min-h-screen inset-0 bg-black bg-opacity-10 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?cs=srgb&dl=pexels-apasaric-1285625.jpg&fm=jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center ">
              <Link
                to="/forgot-Password"
                className="text-sm text-white hover:underline"
              >
                Forget Password?
              </Link>
            </div>
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}
            <motion.button
              className="mt-5 w-full tracking-[5px] py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 flex justify-center">
          <p className="text-sm text-gray-400">
            Don't Have An Account ?{"  "}
            <Link to={"/signup"} className="text-blue-400 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
