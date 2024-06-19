import React, { useState } from "react";
import carImage from "../../../assets/backgroundcar.svg";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [insertResult, setInsertResult] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      setInsertResult(result.message);

      if (result.message === "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.") {
        setShowError(true);
      } else {
        setShowError(false);
        const token = result.token;
        localStorage.setItem("token", token);

        // Fetch user role
        const responseUser = await fetch("http://localhost:8000/api/v1/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await responseUser.json();

        if (userData.role === "user") {
          navigate("/");
        } else {
          result.message = "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.";
          setInsertResult(result.message);
          setShowError(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="loginPage">
      <img src={carImage} alt="Latar Belakang Mobil" />

      <div className="loginForm">
        <div className="rectangleAdmin"></div>

        <h2>Welcome</h2>
        {showError && (
          <div className="errorMessage">
            <p id="insert-results" className="resultWrong">{insertResult}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="formLogin">
          <h3 className="font">Email</h3>
          <input
            type="text"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="font">Password</h3>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="buttonLogin" type="submit">
            <strong>Sign In</strong>
          </button>

          <button className="buttonRegister" type="button" onClick={handleRegisterClick}>
            <strong>Register</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
