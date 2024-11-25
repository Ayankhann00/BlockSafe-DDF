import React, { useState } from "react";
import { Client, Account } from "appwrite";

const client = new Client().setProject(''); // Your project ID
const account = new Account(client);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Use correct method to create an email/password session
    account.createEmailPasswordSession(email, password)
      .then((response) => {
        console.log("Login successful:", response);
        window.location.href = "/dashboard"; // Redirect after login
      })
      .catch((err) => {
        console.error("Error logging in:", err);
        setError(err.message);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2><strong>LOGIN</strong></h2>
        <div className="input-box" id="mainbox-1">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box" id="mainbox-2">
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Show error if any */}
        <div className="checkbox" id="mainbox-3">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            I AGREE TO ALL THE TERMS AND CONDITIONS.
          </label>
          <a href="/forgot-password">FORGOT PASSWORD?</a>
        </div>
        <button type="submit" className="btn">
          <strong>LOGIN</strong>
        </button>
        <div className="box" id="mainbox-5">
          <p>
            DONT HAVE AN ACCOUNT? <a href="/sign-up">Create One</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
