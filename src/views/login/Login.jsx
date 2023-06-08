import axios from "../../lib/axios-client";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const errTitle = "Erros: ";

  useEffect(() => {
    const checkIfLogged = async () => {
      try {
        const check = await axios.get("/api/status");
        if (check.data["auth"]) {
          navigate("/home");
        }
      } catch (err) {
        // console.log(err);
      }
    };
    checkIfLogged();
  }, []);

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleLogin = async (event) => {
    event.preventDefault();
    let errsList = [];

    await csrf();
    try {
      await axios.post("/login", {
        email,
        password,
      });
      navigate("/util");
    } catch (err) {
      //console.log(err);
      if (err.response.status === 422) {
        const errs = err.response.data.errors;
        let count = 0;
        for (const key in errs) {
          errsList.push(<li key={count} >{errs[key]}</li>);
          count++;
        }

        setErrors(errsList);
      }
    }
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
