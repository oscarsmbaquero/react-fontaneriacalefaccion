import React, { useState, useEffect } from "react";
import "./SplashScreen.scss";
//import logo from '../../assets/images/logo1.png'
//import logo2 from '../../assets/images/logo2.jpeg'
import logo from '../../assets/images/logo.png'

const SplashScreen = () => {
  const [animation, setAnimation] = useState("fadeIn");

  useEffect(() => {
    setTimeout(() => setAnimation("fadeOut"), 3800);
    //https://images-na.ssl-images-amazon.com/images/I/41t8oP3wO8L.png
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
