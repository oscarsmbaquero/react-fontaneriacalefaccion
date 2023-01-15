import React, { useState, useEffect } from "react";
import "./SplashScreen.scss";
import logo from '../../assets/images/logo.png'

const SplashScreen = () => {
  const [animation, setAnimation] = useState("fadeIn");

  useEffect(() => {
    setTimeout(() => setAnimation("fadeOut"), 3800);
  }, []);

  return (
    <div className="splashScreen">
      <div className={animation}>
        <img  src ={logo} className="image" alt="logo"/>
        </div>
    </div>
  );
};

export default SplashScreen;
