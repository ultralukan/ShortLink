import React, {useState} from "react";
import NavigationBlock from "../Blocks/NavigationBlock";

export default function RegistrationPage() {

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const fetchRegist = async () => {
    try {
      const response = await fetch(`http://79.143.31.216/register?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setError("")
      setSuccess("")
      if (response.status === 400) setError(() => "Пользователь с данным именем пользователя уже существует")
      else {
        setSuccess(() => "Вы успешно зарегистрировались")
        setUserName("")
        setPassword("")
      }
    } catch (e) {
      alert(e)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetchRegist()
  }

  return (
    <>
      <NavigationBlock/>
      <div className="form-block">
        <form onSubmit={handleSubmit}>
          <h1>Регистрация</h1>
          <input required value={username} onChange={e => setUserName(e.target.value)} name="username" type="text" placeholder="Введите имя пользователя..."/>
          <input required value={password} onChange={e => setPassword(e.target.value)} name="password" type="password" placeholder="Введите пароль..."/>
          <button type="submit">Зарегистрироваться</button>
          <div className="form-block__error">{error}</div>
          <div className="form-block__success">{success}</div>
        </form>
      </div>
    </>
  );
}

