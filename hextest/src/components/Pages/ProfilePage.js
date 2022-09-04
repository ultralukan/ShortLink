import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import NavigationBlock from "../Blocks/NavigationBlock";

export default function ProfilePage({isLoggedIn, setIsLoggedIn}) {
  const [link, setLink] = useState()
  const [stat, setStat] = useState([])
  const [error, setError] = useState("")
  const [order, setOrder] = useState("")
  const navigate = useNavigate();
  const [flagTarget, setFlagTarget] = useState(false)
  const [flagShort, setFlagShort] = useState(false)
  const [flagCount, setFlagCount] = useState(false)

  const fetchLink = async () => {
    try {
      const response = await fetch(`http://79.143.31.216/squeeze?link=${link}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        method: "POST"
      })
      const result = await response.json()
      return result
    }catch (e) {
      alert(e)
    }
  }

  const fetchStatistic = async () => {
    try {
      const response = await fetch(`http://79.143.31.216/statistics${order}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        method: "GET"
      })
      let result =  await response.json()
      setStat(result)
    }catch (e) {
      alert(e)
    }
  }


  useEffect(() => {
    fetchStatistic()
  }, [order])

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn == 'undefined') {
      navigate("/login")
    }
  }, [isLoggedIn])


  const handleSubmit = e => {
    e.preventDefault();
    fetchLink()
    fetchStatistic()
  }

  const targetHandler = () => {
    flagTarget ? setOrder("?order=asc_target") : setOrder("?order=desc_target")
    setFlagTarget(!flagTarget)
  }

  const shortHandler = () => {
    flagShort ? setOrder("?order=asc_short") : setOrder("?order=desc_short")
    setFlagShort(!flagShort)
  }

  const countHandler = () => {
    flagCount ? setOrder("?order=asc_counter") : setOrder("?order=desc_counter")
    setFlagCount(!flagCount)
  }

  return (
    <>
      {
        isLoggedIn ? (
          <>
            <NavigationBlock isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <div className="profile-block">
              <div className="form-block">
                <h1>Сократить ссылку</h1>
                <input value={link} onChange={e => setLink(e.target.value)} name="link" type="text" placeholder="Введите ссылку..."/>
                <button onClick={handleSubmit} type="submit">Изменить</button>
                <div className="form-block__error">{error}</div>
              </div>
              <table>
                <thead>
                <tr>
                  <th>
                    <button onClick={targetHandler}>
                      Исходная ссылка
                    </button>
                  </th>
                  <th>
                    <button onClick={shortHandler}>
                      Сокращенная ссылка
                    </button>
                  </th>
                  <th>
                    <button onClick={countHandler}>
                      Кол-во переходов
                    </button>
                  </th>
                </tr>
                </thead>
                <tbody>
                {
                  stat && stat.length ? stat.map(item => {
                    const {id, counter, short, target} = item
                    return(
                      <tr key={short}>
                        <td><a target="_blank" rel="noreferrer nofollow" href={target}>{target}</a></td>
                        <td><a target="_blank" rel="noreferrer nofollow" href={`http://79.143.31.216/s/${short}`}>http://79.143.31.216/s/{short}</a></td>
                        <td>{counter}</td>
                      </tr>
                    )}): null
                }
                </tbody>
              </table>
            </div>
          </>
        ): null
      }
    </>
    );
}

