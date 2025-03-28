import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login successful!");
        // Navigation is now handled by the AuthContext
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

  const handleDemoLogin = async (type) => {
    setIsLoading(true);

    try {
      const demoCredentials = {
        employee: { email: "john.doe@company.com", password: "password123" },
        admin: { email: "sarah.williams@company.com", password: "password123" },
      };

      const { email, password } = demoCredentials[type];
      const success = await login(email, password);

      if (success) {
        toast.success(`Logged in as ${type}!`);
        // Navigation is now handled by the AuthContext
      } else {
        toast.error(
          `Error logging in with demo ${type} account. Please try again.`,
        );
      }
    } catch (error) {
      console.error("Demo login error:", error);
      toast.error(
        `Error logging in with demo ${type} account. Please try again.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pattern p-4">
      <div className="neo-glass rounded-2xl w-full max-w-md py-8 px-6 sm:px-10 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gradient mb-2">VibeCatcher</h2>
          <p className="text-gray-600 text-sm">
            Monitor well-being, boost engagement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your.email@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-green-600 hover:text-green-700"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 button-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("employee")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-green-300 rounded-lg shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Demo Employee
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-2 border border-green-300 rounded-lg shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-600 hover:text-green-700"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} VibeCatcher. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
