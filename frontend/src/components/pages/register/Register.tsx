import React, { useState } from "react";
import carImage from "../../../assets/backgroundcar.svg";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [insertResult, setInsertResult] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (email === "" || password === "" || name === "") {
        setInsertResult("Name,Email,Password tidak boleh kosong");
        setShowError(true);
        return;
      }
      else {
        const response = await fetch("http://localhost:8000/api/v1/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        setInsertResult(result.message);
        if (result.message == "Email sudah terdaftar." || result.message == "Terjadi kesalahan saat memeriksa email." || result.message == "Gagal melakukan registrasi.") {
          setShowError(true)
          setShowSuccess(false)
        }
        else if (result.message == "Berhasil melakukan registrasi") {
          setShowSuccess(true)
          setShowError(false)
        }
        else {
          setShowError(false)
          setShowSuccess(false)
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <img src={carImage} alt="Latar Belakang Mobil" />

      <div className="loginForm">
        <div className="rectangleAdmin"></div>

        <h2>Registration</h2>
        {showError && (
          <div className="errorMessage">
            <p id="insert-results" className="resultWrong">{insertResult}</p>
          </div>
        )}
        {showSuccess && (
          <div className="successMessage">
            <p id="insert-results" className="resultSuccess">{insertResult}</p>
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
          <h3 className="font">Name</h3>
          <input
            type="text"
            className="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3 className="font">Password</h3>
          <input
            type="password"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="buttonRegister" type="submit">
            <strong>Register</strong>
          </button>
          <button className="buttonLogin" type="button" onClick={handleLoginClick}>
            <strong>Login</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
