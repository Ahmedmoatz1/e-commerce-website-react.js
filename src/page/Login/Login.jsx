import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../components/context/Logincontext"; 
import styles from "./Login.module.css";

const Login = () => { 
  const { login, register, isLoggedIn, user, logout } = useContext(LoginContext); 
  const [isRegister, setIsRegister] = useState(false); 
  const [form, setForm] = useState({ name: "", email: "", password: "" }); 
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value }); 
  }; 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    let success = false;

    if (isRegister) { 
      success = register(form.name, form.email, form.password); 
      if (!success) {
        alert("Email already exists!");
        return;
      }
    } else { 
      success = login(form.email, form.password); 
      if (!success) {
        alert("Invalid email or password!");
        return;
      }
    } 

    // لو نجح تسجيل الدخول أو التسجيل
    if (success) {
      navigate("/"); // تحويل الصفحة الرئيسية
    }
  }; 

  if (isLoggedIn) { 
    return ( 
      <div className={styles.loginContainer}>
        <div className={styles.loggedInBox}>
          <h2>Welcome, {user.name}</h2> 
          <button onClick={logout} className={styles.logoutButton}>Logout</button> 
        </div>
      </div>
    ); 
  } 

  return ( 
    <div className={styles.loginContainer}> 
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>{isRegister ? "Register" : "Login"}</h2> 
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={form.name} 
              onChange={handleChange} 
              className={styles.inputField}
              required 
            /> 
          )}
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            className={styles.inputField}
            required 
          /> 
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={handleChange} 
            className={styles.inputField}
            required 
          /> 
          <button type="submit" className={styles.loginButton}>{isRegister ? "Register" : "Login"}</button> 
        </form> 
        <div className={styles.switchAuth} onClick={() => setIsRegister(!isRegister)}> 
          {isRegister ? "Have an account? Login" : "No account? Register"} 
        </div>
      </div>
    </div> 
  ); 
}; 

export default Login;
