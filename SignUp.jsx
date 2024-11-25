import React, { useState } from "react";
import { Client, Account } from "appwrite";

const client = new Client().setProject(''); // Your project ID
const account = new Account(client);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setShake(true);
      return;
    }

    // Create user with email and password
    account.create('unique()', email, password)
      .then((response) => {
        console.log('User created successfully:', response);
        window.location.href = "/sign-in"; // Redirect to sign-in page
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        setError(err.message);
        setShake(true);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={shake ? "shake" : ""}>
        <h2><strong>Create Account</strong></h2>

        <div className="input-box">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn">
          <strong>CREATE ACCOUNT</strong>
        </button>

        <div className="box">
          <p>
            ALREADY HAVE AN ACCOUNT? <a href="/sign-in">Sign In</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
