import React, { Fragment, useState, useEffect, useRef, useContext } from "react";
import "./AuthForm.css";
import { toast } from "react-toastify";
import { signUp, signIn } from "../../api";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";

const AuthForm = () => {
  const {userData, login} = useContext(UserContext);
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Ref for auto-focus

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const { name, email, password } = user;
    let isValid = true;

    if (isSignIn) {
      if (!email || !password) {
        toast.error("Email and password are required");
        return false;
      }
    } else {
      if (!name || !email || !password) {
        toast.error("All fields are required");
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      isValid = false;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      isValid = false;
    } else if (!/\d/.test(password)) {
      toast.error("Password must include at least one number");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        if (isSignIn) {
          const response = await signIn({ email: user.email, password: user.password });
          toast.success(`Welcome back, ${response.data.user.name}`);
          login({ name: response.data.user.name, email: response.data.user.email});
          localStorage.setItem("authToken",response.data.token);

        } else {
          const response = await signUp(user);
          toast.success(response.data.message);
          setIsSignIn(true);

        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  // Auto-focus the first input field when mode changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSignIn]);

  return (
    <Fragment>
      <div className="container auth-form">
        <form onSubmit={handleSubmit} noValidate>
          {!isSignIn && (
            <div className="form-group">
              <label>User Name</label>
              <input
                ref={isSignIn ? null : inputRef} // Auto-focus based on mode
                type="text"
                className="form-control"
                placeholder="Enter UserName"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          )}
          <div className="form-group">
            <label>Email address</label>
            <input
              ref={isSignIn ? inputRef : null} // Auto-focus based on mode
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="btns">
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <button
              type="reset"
              onClick={() => setUser({ name: "", email: "", password: "" })}
              disabled={loading}
            >
              Clear
            </button>
          </div>
          <div className="toggle-auth">
            {isSignIn ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  className={`btn btn-link ${loading ? "disabled" : ""}`}
                  onClick={() => setIsSignIn(false)}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className={`btn btn-link ${loading ? "disabled" : ""}`}
                  onClick={() => setIsSignIn(true)}
                  disabled={loading}
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthForm;
