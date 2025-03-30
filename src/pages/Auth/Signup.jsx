import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Link,useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const { isAuthenticated, signup, isLoading } = useAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "employee",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.employeeId) errors.employeeId = "Employee ID is required";
    if (!formData.name) errors.name = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id: formData.employeeId,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        }),
      })
      const res=await response.json();
      const success=(res.email?true:false);

      if (success) {
        toast.success("Account created successfully!");
        navigate('/login')
      } else {
        setFormErrors({
          form: "An account with this employee ID or email already exists.",
        });
        toast.error("Registration failed. Please check your information.");
      }
    } catch (error) {
      console.error(error);
      setFormErrors({
        form: "An error occurred during registration.",
      });
      toast.error("Registration failed. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/employee/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pattern p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Vibe<span className="text-green-600">Catcher</span>
          </h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="neo-glass rounded-xl p-8 shadow-sm animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium mb-1"
                >
                  Employee ID
                </label>
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${formErrors.employeeId ? "border-red-500" : ""
                    }`}
                  placeholder="EMP001"
                />
                {formErrors.employeeId && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.employeeId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all appearance-none bg-white"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin (HR)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${formErrors.name ? "border-red-500" : ""
                  }`}
                placeholder="John Doe"
              />
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${formErrors.email ? "border-red-500" : ""
                  }`}
                placeholder="john.doe@company.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium mb-1"
              >
                Department (Optional)
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="Engineering"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${formErrors.password ? "border-red-500" : ""
                    }`}
                  placeholder="••••••••"
                />
                {formErrors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${formErrors.confirmPassword ? "border-red-500" : ""
                    }`}
                  placeholder="••••••••"
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {formErrors.form && (
              <div className="text-red-500 text-sm bg-red-100 bg-opacity-10 p-2 rounded-lg">
                {formErrors.form}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 button-hover"
              onClick={(e) => handleSubmit(e)}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
