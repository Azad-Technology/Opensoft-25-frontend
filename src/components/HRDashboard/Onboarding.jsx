import React, { useState, useEffect } from "react";
import {
  UserPlus, CheckCircle, Sparkles,
  Users, UserCog, Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../employeeCompo/Layout";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

const Button = ({ children, variant, size, type, onClick, className, disabled }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-transparent dark:border-green-500";
      default:
        return "bg-green-600 text-white dark:bg-teal-700 dark:text-green-50";
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
      className={`rounded-md font-medium transition-all ${getVariantClass()} ${getSizeClass()} ${className || ""}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg border shadow-sm dark:bg-gray-800 dark:border-green-500 ${className || ""}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => {
  return (
    <div className={`px-6 py-4 ${className || ""}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className }) => {
  return (
    <h3 className={`text-lg font-semibold dark:text-greem-50 ${className || ""}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children }) => {
  return (
    <p className="text-sm text-gray-500 dark:text-gray-300">
      {children}
    </p>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={`px-6 py-4 ${className || ""}`}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className }) => {
  return (
    <div className={`flex items-center px-6 py-4 ${className || ""}`}>
      {children}
    </div>
  );
};

const Input = ({ id, type, placeholder, required, value, onChange, className, disabled }) => {
  return (
    <input
      id={id}
      type={type || "text"}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-green-500 dark:text-gray-100 placeholder:dark:text-gray-300 ${className || ""}`}
    />
  );
};

const Label = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 dark:text-gray-200 ${className || ""}`}>
      {children}
    </label>
  );
};

const RadioGroup = ({ className, onValueChange, value, children }) => {
  return (
    <div className={`flex ${className || ""} dark:text-gray-200`} role="radiogroup">
      {React.Children.map(children, (child) => (
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={child.props.id}
            name="userTypeRadio"
            value={child.props.value}
            checked={value === child.props.value}
            onChange={() => onValueChange(child.props.value)}
            className="h-4 w-4 cursor-pointer"
          />
          {child.props.label}
        </div>
      ))}
    </div>
  );
};

const RadioGroupItem = ({ value, id, label }) => {
  return null;
};

// const useToast = () => {
//   const [toasts, setToasts] = useState([]);

//   const toast = ({ title, description, variant }) => {
//     console.log(`Toast: ${title} - ${description} (${variant})`);
//   };

//   return { toast };
// };

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
  const isMobile = useMobile();
  // const { toast } = useToast();
  const { theme } = useTheme();
  const { token } = useAuth();

  const handleUserTypeChange = (value) => {
    console.log("User type changed to:", value);
    setUserType(value);
  };

  useEffect(() => {
    console.log("User type changed in effect:", userType);
    generateEmployeeId();

    if (formData.name) {
      generateEmail(formData.name);
    }

    generatePassword();
  }, [userType, formData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast({
    //   title: `${userType === "hr" ? "HR Personnel" : "Employee"} added successfully`,
    //   description: `The new ${userType === "hr" ? "HR personnel" : "employee"} has been added to the system.`,
    //   variant: "success",
    // });

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/admin/add_onboarding`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "role_type": userType,
          "name": formData.name,
          "role": formData.role,
          "employee_id": formData.employeeId,
          "email": formData.email,
          "password": formData.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("success")
      toast.success(`${userType === "hr" ? "HR Personnel" : "Employee"} added successfully!`);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Error fetching profile data");
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

    console.log("Generating ID with prefix:", prefix);

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
        email = `hr.${nameParts[0]}.${nameParts[nameParts.length - 1]}@company.com`;
      } else {
        email = `${nameParts[0]}.${nameParts[nameParts.length - 1]}@company.com`;
      }
    } else {
      if (userType === "hr") {
        email = `hr.${nameParts[0]}@company.com`;
      } else {
        email = `${nameParts[0]}@company.com`;
      }
    }

    console.log("Generated email:", email);

    setFormData((prev) => ({
      ...prev,
      email: email,
    }));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setFormData((prev) => ({
      ...prev,
      password: password,
    }));
  };

  return (
    <Layout>
      <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900`}>
        <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="flex items-center text-3xl font-bold text-green-700 dark:text-green-300">
                <span className="inline-block dark:text-gray-100">Employee Onboarding</span>
              </h1>
              <p className="text-muted-foreground dark:text-gray-300">
                Add new team members to your organization
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute -left-10 -top-10 h-20 w-20 rounded-full bg-green-300/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
            <motion.div
              className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full bg-emerald-400/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.div
              className="absolute -right-12 top-1/3 h-24 w-24 rounded-full bg-teal-300/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />

            <Card className="relative overflow-hidden border-green-200 dark:border-green-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />

              <CardHeader className="relative border-b border-green-100 dark:border-green-500 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-green-600">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <UserPlus className="h-5 w-5" />
                  New Team Member Registration
                </CardTitle>
                <CardDescription>
                  Enter the details to add a new member to your organization
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="relative grid gap-6 pt-6 dark:bg-gray-900">
                  <motion.div
                    className="mb-4 rounded-lg border border-green-100 dark:border-green-500 bg-green-50 dark:bg-gray-800 p-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label className="mb-3 block font-medium text-green-800 dark:text-green-200">
                      Select Member Type
                    </Label>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="employee"
                          name="userTypeRadio"
                          value="employee"
                          checked={userType === "employee"}
                          onChange={() => handleUserTypeChange("employee")}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label htmlFor="employee" className="flex cursor-pointer items-center gap-1">
                          <Briefcase className="h-4 w-4" /> Regular Employee
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="hr"
                          name="userTypeRadio"
                          value="hr"
                          checked={userType === "hr"}
                          onChange={() => handleUserTypeChange("hr")}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label htmlFor="hr" className="flex cursor-pointer items-center gap-1">
                          <UserCog className="h-4 w-4" /> HR Personnel
                        </Label>
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
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border-green-200 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Label htmlFor="role">Role</Label>
                          <Input
                            id="role"
                            placeholder={userType === "hr" ? "HR Manager" : "Software Engineer"}
                            required
                            value={formData.role}
                            onChange={handleInputChange}
                            className="border-green-200 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="employeeId">{userType === "hr" ? "HR ID" : "Employee ID"}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="employeeId"
                        placeholder={userType === "hr" ? "HR1234" : "EMP1234"}
                        required
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="border-green-200 font-mono transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateEmployeeId}
                        className="flex-shrink-0 border-green-200 dark:border-green-500 bg-green-50 dark:bg-gray-700 text-green-700 dark:text-green-50 transition-all duration-300 hover:bg-green-100 hover:text-green-800"
                      >
                        Auto Generate
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder={userType === "hr" ? "hr.john.doe@company.com" : "john.doe@company.com"}
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-green-200 transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="password">Email Password</Label>
                    <div className="flex gap-2">
                      <Input
                        id="password"
                        type="text"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-green-200 font-mono transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generatePassword}
                        className="flex-shrink-0 border-green-200 dark:border-teal-500 bg-green-50 dark:bg-gray-700 text-green-700 dark:text-green-50 transition-all duration-300 hover:bg-green-100 hover:text-green-800"
                      >
                        Auto Generate
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>

                <CardFooter className="relative border-t border-green-100 dark:border-green-500 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-green-600">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-green-200 dark:border-green-500 bg-white/80 dark:bg-gray-900 transition-all duration-300 hover:bg-white dark:hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-auto">
                    <Button
                      type="submit"
                      className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-green-700 text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-700"
                    >
                      <span className="relative z-10 flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Add {userType === "hr" ? "HR Personnel" : "Employee"}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-green-500/0 via-white/20 to-green-500/0 transition-transform duration-1000 hover:translate-x-full" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground dark:text-gray-300"
          >
            <p className="flex items-center justify-center gap-1">
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
