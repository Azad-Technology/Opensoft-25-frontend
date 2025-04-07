import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Users,
  Lock,
  Mail,
  Shield,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const SliderContent = [
  {
    icon: Briefcase,
    title: "Welcome to Deloitte Connect",
    description: "Sign in to access your personalized dashboard, resources, and exclusive insights.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Benefit from robust, enterprise‑grade security designed to protect your professional data.",
  },
  {
    icon: Users,
    title: "Empowering Collaboration",
    description: "Join a global network of professionals and leverage innovative tools to drive success.",
  },
];

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const res = await response.json();

      if (res.access_token) {
        const expiresIn = 24 * 60 * 60 * 1000;
        const expirationTime = new Date().getTime() + expiresIn;

        const tokenData = {
          access_token: res.access_token,
          expiration: expirationTime,
          user: res.user,
        };

        localStorage.setItem("auth", JSON.stringify(tokenData));
        await login(res.user, res.access_token);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SliderContent.length);
    }, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "#051a12",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00a85a]/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00a85a]/10 blur-3xl"></div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #00a85a 1px, transparent 1px), 
                              linear-gradient(to bottom, #00a85a 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00a85a]/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 100,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex shadow-2xl rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#00a85a]/20"
      >
        <div className="hidden sm:flex w-1/2 bg-black/30 backdrop-blur-lg p-8 flex-col justify-center items-center relative border-r border-[#00a85a]/30 sm: display-none">
          <span className="text-white absolute left-0 top-0 text-4xl mx-2 my-2 px-2 py-2 cursor-pointer hover:bg-[#00a85a]/30 rounded-full transition-colors duration-300" onClick={() => navigate('/')}>
            <ArrowLeft />
          </span>
          <AnimatePresence mode="wait">
            {SliderContent.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-center absolute"
                  >
                    <slide.icon
                      className="mx-auto mb-4 text-[#00a85a]"
                      size={60}
                    />
                    <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                    <p className="text-white/80">{slide.description}</p>
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 flex space-x-2">
            {SliderContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? "bg-[#00a85a]" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 sm:flex-none w-1/2 bg-black/10 backdrop-blur-lg p-12 relative text-white ">
        <span className="sm:hidden text-white absolute left-0 top-0 text-4xl mx-2 my-2 px-2 py-2 cursor-pointer hover:bg-[#00a85a]/30 rounded-full transition-colors duration-300" onClick={() => navigate('/')}>
            <ArrowLeft />
          </span>
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-6 right-6 w-2 h-2 bg-[#00a85a] rounded-full"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-[#00a85a] rounded-full"></div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-[#00a85a] mb-8">
              Welcome Back
            </h2>

            <div className="relative">
              <Mail
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[#00a85a] opacity-70"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-3 pl-7 border-b-2 border-[#00a85a]/50 focus:border-[#00a85a] focus:outline-none bg-transparent text-white placeholder-white/60 transition-all duration-300"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[#00a85a] opacity-70"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 pl-7 border-b-2 border-[#00a85a]/50 focus:border-[#00a85a] focus:outline-none pr-10 bg-transparent text-white placeholder-white/60 transition-all duration-300"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#00a85a] hover:text-[#00c86b] transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#00a85a] text-white p-3 rounded-full hover:bg-[#00c86b] transition duration-300 flex items-center justify-center shadow-lg shadow-[#00a85a]/20 mt-8"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
