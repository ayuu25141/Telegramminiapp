import React from 'react'
import VideoPlayer from '../player/Playercard'
import Playernav from '../player/playernav'
import Feed from '../player/Feed'
import Playerfooter from '../player/Playerfooter'

function Player() {
  return (
   <>
   <Playernav />
   <VideoPlayer />
   <Feed />
   <Playerfooter />
   
   </>
  )
}

export default Player