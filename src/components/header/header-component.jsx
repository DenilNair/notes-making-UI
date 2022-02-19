//rafce
import React, { useEffect, useState } from "react";
import "./navbar.css";
import {  Link } from "react-router-dom";


export default function Headercomponent() {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  });
  return (
   
         
          <nav>
            {(toggleMenu || screenWidth > 500) && (
              <ul className="list">
                <li className="items"> <Link className="linkClass" to="/">Home</Link></li>

              
                <li className="items"><Link className="linkClass"  to="/create">Create Note</Link> </li>
                <li className="items"><Link className="linkClass"  to="/contact-us">Contact Us</Link></li>
              </ul>
            )}

            <button className="btn" onClick={toggleNav}>
              View
            </button>
          </nav>
          
        
  );
}
