import { createContext, useContext, useState} from "react";
import axios from "../lib/axios-client";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const {data} = await axios.get('/api/user');
    setUser(data);
  }

  const login = async({email, password}) => {
      let errsList = [];
      await csrf();
      try {
        await axios.post("/login", {
          email,
          password,
        });
        getUser();
        //navigate("/util");
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
    }

  const register = async({name, email, password, password_confirmation}) => {
      let errsList = [];
      await csrf();
      try {
        await axios.post("/register", {
          name,
          email,
          password,
          password_confirmation
        });
        return true;
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

        return false;
      } 
    }
  

  return (<AuthContext.Provider value={{user, errors, setErrors, login, register}}>{children}</AuthContext.Provider>)
}

export default function useAuthContext(){
  return useContext(AuthContext);
}