import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../ui/PrimaryButton";
import GlassInput from "../ui/GlassInput";

import {
  login,
  register,
} from "../../api/authApi";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";

const AuthCard = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    console.log(result.user);

    navigate("/dashboard");
  } catch (error) {
    console.error("Google Login Error:", error);
  }
};

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Email and Password are required."
      );
      return;
    }

    if (
      !isLogin &&
      !formData.name
    ) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      let response;

      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      console.log("Login Success");

      console.log(response);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Authentication failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        relative
        w-full
        max-w-[820px]
        overflow-hidden
        rounded-[40px]
        border
        border-cyan-400/20
        bg-white/5
        px-16
        py-16
        backdrop-blur-3xl
        shadow-[0_0_140px_rgba(59,130,246,.22)]
      "
    >
      <motion.div
        animate={{
          opacity: [0.35, 0.75, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[40px]
          border
          border-cyan-400/20
        "
      />

      <motion.h1
        layout
        className="
          text-center
          text-5xl
          font-bold
          tracking-tight
          text-white
        "
      >
        {isLogin
          ? "Welcome Back"
          : "Create Account"}
      </motion.h1>

      <motion.p
        layout
        className="
          mt-6
          text-center
          text-2xl
          text-slate-400
        "
      >
        {isLogin
          ? "Sign in to continue to SyncSpace."
          : "Create your SyncSpace account."}
      </motion.p>

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={handleGoogleLogin}
        className="
          group
          mt-12
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-white/10
          text-xl
          font-semibold
          text-white
          transition-all
          duration-300

          hover:border-cyan-400/40
          hover:bg-white/15
          hover:shadow-[0_0_40px_rgba(255,255,255,.15)]
        "
      >
        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.08,
          }}
        >
          <FcGoogle size={30} />
        </motion.div>

        Continue with Google
      </motion.button>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-white/10" />

        <span className="px-6 text-lg text-slate-500">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <AnimatePresence>
        {!isLogin && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="mb-6"
          >
            <GlassInput
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <GlassInput
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="mt-6">
        <GlassInput
          name="password"
          placeholder="Password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={formData.password}
          onChange={handleChange}
          rightIcon={
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                text-slate-400
                transition-all
                duration-300
                hover:text-cyan-400
              "
            >
              {showPassword ? (
                <EyeOff size={26} />
              ) : (
                <Eye size={26} />
              )}
            </button>
          }
        />
      </div>
            {/* Error Message */}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="
              mt-5
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              text-center
              text-sm
              text-red-300
            "
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password */}

      <AnimatePresence>
        {isLogin && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-6 flex justify-end"
          >
            <button
              type="button"
              className="
                text-base
                font-medium
                text-cyan-400
                transition-all
                duration-300
                hover:text-cyan-300
                hover:underline
              "
            >
              Forgot Password?
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login/Register Button */}

      <div className="mt-10">
        <PrimaryButton
          disabled={loading}
          onClick={handleSubmit}
          className="h-16 w-full rounded-3xl text-xl"
        >
          {loading
            ? isLogin
              ? "Logging In..."
              : "Creating Account..."
            : isLogin
            ? "Login"
            : "Create Account"}
        </PrimaryButton>
      </div>

      {/* Footer */}

      <motion.div
        layout
        className="mt-10 text-center text-lg"
      >
        <span className="text-slate-400">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setShowPassword(false);
            setError("");

            setFormData({
              name: "",
              email: "",
              password: "",
            });
          }}
          className="
            ml-2
            font-semibold
            text-cyan-400
            transition-all
            duration-300
            hover:text-cyan-300
          "
        >
          {isLogin ? "Create Account" : "Login"}
        </button>
      </motion.div>

      {/* Bottom Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          left-1/2
          h-60
          w-[520px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/20
          blur-[120px]
        "
      />
    </motion.div>
  );
};

export default AuthCard;