import { useState, useEffect} from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const {register, errors, setErrors} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setErrors([]);
  }, [])

  const handleRegister = async (event) => {
    event.preventDefault();
    const redirect = await register({name, email, password, password_confirmation});
    if(redirect){
    navigate("/login");
    }
      
  };

  return (
    <div className="register-container">
      <img id="icon-register" src="/registericon.png" />
      {errors.length !== 0 && <h4>Erros: </h4>}
      <ul>{errors}</ul>
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
