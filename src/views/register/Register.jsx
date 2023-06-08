import { useState } from "react";
import "./Register.css";
import axios from "../../lib/axios-client";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    let errsList = [];
    axios
      .get("/sanctum/csrf-cookie")
      .then(
        axios
          .post("/register", {
            name,
            email,
            password,
            password_confirmation,
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 422) {
              const errs = err.response.data.errors;
              let count = 0;
              for (const key in errs) {
                errsList.push(<li key={count}>{errs[key]}</li>);
                count++;
              }

              setErrors(errsList);
            }
          })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <img id="icon-register" src="/registericon.png" />
      {errors}
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Repita a senha"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
