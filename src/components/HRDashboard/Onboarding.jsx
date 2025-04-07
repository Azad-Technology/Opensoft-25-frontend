import React, { useState, useEffect } from "react";
import {
  UserPlus,
  CheckCircle,
  Sparkles,
  Users,
  UserCog,
  Briefcase,
  RefreshCw,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../employeeCompo/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

const Button = ({
  children,
  variant,
  size,
  type,
  onClick,
  className,
  disabled,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-white dark:bg-gray-800 dark:border-green-500 hover:bg-gray-50 dark:hover:bg-gray-700";
      default:
        return "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "icon":
        return "p-2";
      default:
        return "px-4 py-2";
    }
  };

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-medium transition-all ${getVariantClass()} ${getSizeClass()} ${className || ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} shadow-sm`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-xl border shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:border-green-500/30 ${className || ""}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return <div className={`px-6 py-5 ${className || ""}`}>{children}</div>;
};

const CardTitle = ({ children, className }) => {
  return (
    <h3 className={`text-xl font-bold dark:text-white ${className || ""}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children }) => {
  return (
    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{children}</p>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`px-6 py-5 ${className || ""}`}>{children}</div>;
};

const CardFooter = ({ children, className }) => {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 ${className || ""}`}
    >
      {children}
    </div>
  );
};

const Input = ({
  id,
  type,
  placeholder,
  required,
  value,
  onChange,
  className,
  disabled,
  icon,
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-3 ${icon ? "pl-10" : ""} focus:ring-2 focus:ring-green-500/30 focus:border-green-500 border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${className || ""}`}
      />
    </div>
  );
};

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 block ${className || ""}`}
    >
      {children}
    </label>
  );
};

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

function EmployeeOnboarding() {
  const [userType, setUserType] = useState("employee");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    employeeId: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMobile();
  const { theme } = useTheme();
  const { token } = useAuth();

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  useEffect(() => {
    generateEmployeeId();

    if (formData.name) {
      generateEmail(formData.name);
    }

    generatePassword();
  }, [userType, formData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/admin/add_onboarding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role_type: userType,
            name: formData.name,
            role: formData.role,
            employee_id: formData.employeeId,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success(
        `${userType === "hr" ? "HR Personnel" : "Employee"} added successfully!`,
        {
          description: `${formData.name} has been added to the system.`,
          duration: 5000,
        },
      );

      // Reset form
      setFormData({
        name: "",
        role: "",
        employeeId: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        generateEmployeeId();
        generatePassword();
      }, 100);
    } catch (error) {
      console.error("Error adding new team member:", error);
      toast.error("Failed to add team member", {
        description: "Please try again or contact system administrator.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const generateEmployeeId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = userType === "hr" ? "HR" : "EMP";
    setFormData((prev) => ({
      ...prev,
      employeeId: `${prefix}${randomNum}`,
    }));
  };

  const generateEmail = (name) => {
    if (!name) return;

    const nameParts = name.toLowerCase().split(" ");
    let email = "";

    if (nameParts.length >= 2) {
      if (userType === "hr") {
        email = `hr.${nameParts[0]}.${nameParts[nameParts.length - 1]}@deloitte.com`;
      } else {
        email = `${nameParts[0]}.${nameParts[nameParts.length - 1]}@deloitte.com`;
      }
    } else {
      if (userType === "hr") {
        email = `hr.${nameParts[0]}@deloitte.com`;
      } else {
        email = `${nameParts[0]}@deloitte.com`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      email: email,
    }));
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setFormData((prev) => ({
      ...prev,
      password: password,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      role: "",
      employeeId: "",
      email: "",
      password: "",
    });
    setUserType("employee");
    setIsSubmitting(false);
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent dark:from-green-400 dark:to-green-400">
              Employee Onboarding
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Add new team members to your organization
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-green-300/30 blur-xl dark:bg-green-700/30" />
              <div className="absolute -right-5 top-1/4 h-24 w-24 rounded-full bg-green-300/20 blur-lg dark:bg-green-700/20" />
              <div className="absolute right-1/4 bottom-1/4 h-16 w-16 rounded-full bg-blue-300/20 blur-md dark:bg-blue-700/20" />

              <Card className="border border-gray-200/80 glass-effect relative overflow-hidden bg-white/90 dark:bg-gray-800/90 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/30 to-green-50/50 dark:from-green-900/20 dark:via-gray-800/20 dark:to-green-900/20" />

                <CardHeader className="relative border-b border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-green-600 to-green-600 p-3 rounded-lg text-white">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">
                        New Team Member Registration
                      </CardTitle>
                      <CardDescription>
                        Enter the details to add a new member to your
                        organization
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                  <CardContent className="relative grid gap-6 pt-6">
                    <motion.div
                      className="mb-2 rounded-xl border border-green-100 dark:border-green-900 bg-green-50/50 dark:bg-green-900/20 p-5"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="mb-3 text-green-700 dark:text-green-300 font-medium">
                        Select Member Type
                      </Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                          className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                            userType === "employee"
                              ? "bg-green-100 dark:bg-green-900/40 border-2 border-green-400 dark:border-green-500"
                              : "bg-white/70 dark:bg-gray-700/50 border-2 border-transparent hover:bg-green-50 dark:hover:bg-green-900/20"
                          }`}
                          onClick={() => handleUserTypeChange("employee")}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              userType === "employee"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                            }`}
                          >
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div>
                            <Label
                              htmlFor="employee"
                              className="cursor-pointer text-base font-medium"
                            >
                              Regular Employee
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Standard access to employee tools
                            </p>
                          </div>
                          <input
                            type="radio"
                            id="employee"
                            name="userTypeRadio"
                            value="employee"
                            checked={userType === "employee"}
                            onChange={() => handleUserTypeChange("employee")}
                            className="sr-only"
                          />
                        </div>

                        <div
                          className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                            userType === "hr"
                              ? "bg-green-100 dark:bg-green-900/40 border-2 border-green-400 dark:border-green-500"
                              : "bg-white/70 dark:bg-gray-700/50 border-2 border-transparent hover:bg-green-50 dark:hover:bg-green-900/20"
                          }`}
                          onClick={() => handleUserTypeChange("hr")}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              userType === "hr"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                            }`}
                          >
                            <UserCog className="h-5 w-5" />
                          </div>
                          <div>
                            <Label
                              htmlFor="hr"
                              className="cursor-pointer text-base font-medium"
                            >
                              HR Personnel
                            </Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Advanced HR management access
                            </p>
                          </div>
                          <input
                            type="radio"
                            id="hr"
                            name="userTypeRadio"
                            value="hr"
                            checked={userType === "hr"}
                            onChange={() => handleUserTypeChange("hr")}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={userType}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-green-500" />
                            Personal Information
                          </h3>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Label htmlFor="name">
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="shadow-sm"
                                icon={<Users className="h-4 w-4" />}
                              />
                            </motion.div>
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Label htmlFor="role">
                                Role <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="role"
                                placeholder={
                                  userType === "hr"
                                    ? "HR Manager"
                                    : "Software Engineer"
                                }
                                required
                                value={formData.role}
                                onChange={handleInputChange}
                                className="shadow-sm"
                                icon={<Briefcase className="h-4 w-4" />}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-green-500" />
                        System Credentials
                      </h3>

                      <div className="space-y-6">
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between">
                            <Label htmlFor="employeeId">
                              {userType === "hr" ? "HR ID" : "Employee ID"} Role{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Auto-generated
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              id="employeeId"
                              placeholder={
                                userType === "hr" ? "HR1234" : "EMP1234"
                              }
                              required
                              value={formData.employeeId}
                              onChange={handleInputChange}
                              className="font-mono shadow-sm"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={generateEmployeeId}
                              className="flex-shrink-0 flex items-center gap-1"
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Regenerate
                              </span>
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex justify-between">
                            <Label htmlFor="email">
                              Email Address Role{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Based on name
                            </span>
                          </div>
                          <Input
                            id="email"
                            type="email"
                            placeholder={
                              userType === "hr"
                                ? "hr.john.doe@deloitte.com"
                                : "john.doe@deloitte.com"
                            }
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="shadow-sm"
                          />
                        </motion.div>

                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex justify-between">
                            <Label htmlFor="password">
                              Initial Password Role{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Auto-generated
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              id="password"
                              type="text"
                              required
                              value={formData.password}
                              onChange={handleInputChange}
                              className="font-mono shadow-sm"
                              icon={<Lock className="h-4 w-4" />}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={generatePassword}
                              className="flex-shrink-0 flex items-center gap-1"
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                Regenerate
                              </span>
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            The user will be prompted to change this password on
                            first login
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="relative border-t border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={handleCancel}
                    >
                      Clear
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-green-700 text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-700"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Add{" "}
                              {userType === "hr" ? "HR Personnel" : "Employee"}
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              Human Resources Department • Employee Management System
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeOnboarding;
