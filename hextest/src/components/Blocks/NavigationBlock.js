import React, {useEffect, useState} from "react";
import {
  Link
} from "react-router-dom";

export default function NavigationBlock({isLoggedIn, setIsLoggedIn}) {

  const logOut = () => {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <nav className="navigation-block">
      <ul>
        <li>
          <Link to="/registration">Регистрация</Link>
        </li>
        <li>
          {
            isLoggedIn ? <Link onClick={logOut} to="/">Выход</Link> : <Link to="/login">Вход</Link>
          }
        </li>
      </ul>
    </nav>
  );
}

