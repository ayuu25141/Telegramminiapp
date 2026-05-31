import React, { useState, useEffect } from 'react';
import Home from './page/Home';
import Collection from './page/Player';
import About from './page/About';
import Lock from './lock/Lock';
import { Route, Routes, Navigate } from 'react-router-dom';

import API from './api/axiosconfig';

function App() {

  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  // auto login check
useEffect(() => {

  const token = localStorage.getItem("token")
  const telegramId = localStorage.getItem("telegram_id")

  if(!token || !telegramId){
    setLoading(false)
    return
  }

  API.post("/verifytoken",{
    token,
    telegram_id: telegramId
  })
  .then((res)=>{

    if(res.data.success){

      setUnlocked(true)

    } else {

      localStorage.removeItem("token")
      localStorage.removeItem("telegram_id")

    }

  })
  .catch(()=>{

    localStorage.removeItem("token")
    localStorage.removeItem("telegram_id")

  })
  .finally(()=>{

    setLoading(false)

  })

},[])
  // loading screen
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
      {
        unlocked ? (

          <Routes>
            <Route path='/' element={<Home />} />
          <Route path='/collection/:id' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        ) : (

          <Lock onUnlock={() => setUnlocked(true)} />

        )
      }
    </>
  )
}

export default App;