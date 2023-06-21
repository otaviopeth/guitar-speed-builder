import axios from "../../lib/axios-client";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";
import useAuthContext from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login, errors, setErrors} = useAuthContext();

  useEffect(() => {
    const checkIfLogged = async () => {
      try {
        const check = await axios.get("/api/status");
        if (check.data["auth"]) {
          navigate("/dashboard");
        }
      } catch (err) {
        // console.log(err);
      }
    };
    checkIfLogged();
    setErrors([]);
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    await login({email, password});
    navigate("/util");

  };

  return (
    <div className="login-container">
      <img id="icon-login" src="/loginicon.png" />
      {errors.length !== 0 && <h4>Erros: </h4>}
      <ul>{errors}</ul>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Entrar</button>
      </form>
      <div>
        <span>Ainda não possui conta? </span>
        <Link style={{ color: "red" }} to="/registro">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Login;