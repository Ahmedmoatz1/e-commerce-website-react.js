import React, { useContext } from "react";
import { SlLogin } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/Logincontext";
import styles from "./LoginUserIcon.module.css"; // ممكن تضيف css لو عايز

const LoginUserIcon = () => {
  const { isLoggedIn, user } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.userIconContainer} onClick={handleClick}>
      {isLoggedIn ? (
        <div className={styles.loggedIn}>
          <FaRegUserCircle className={styles.userIcon} />
          <span className={styles.userName}>{user.name}</span>
        </div>
      ) : (
        <SlLogin className={styles.loginIcon} />
      )}
    </div>
  );
};

export default LoginUserIcon;
