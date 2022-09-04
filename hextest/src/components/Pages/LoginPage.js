import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavigationBlock from "../Blocks/NavigationBlock";

export default function LoginPage({isLoggedIn, setIsLoggedIn}) {

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      navigate("/profile")
    }
  },[isLoggedIn])


  const fetchLogin = async () => {
    try {
      const response = await fetch("http://79.143.31.216/login", {
        body: `grant_type=&username=${username}&password=${password}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
      if (!response.ok) setError(() => "Пользователя с данным именем пользователя или паролем не существует")
      else {
        const result = await response.json()
        localStorage.setItem('token', result["access_token"])
        setIsLoggedIn(localStorage.getItem("token"))
      }
    } catch (e) {
      alert(e)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchLogin()
  }

  return (
    <>
      <NavigationBlock />
      <div className="form-block">
        <form onSubmit={handleSubmit}>
          <h1>Вход</h1>
          <input required value={username} onChange={e => setUserName(e.target.value)} name="username" type="text" placeholder="Введите имя пользователя..."/>
          <input required value={password} onChange={e => setPassword(e.target.value)} name="password" type="password" placeholder="Введите пароль..."/>
          <button type="submit">Войти</button>
          <div className="form-block__error">{error}</div>
        </form>
      </div>
    </>
  )
}

