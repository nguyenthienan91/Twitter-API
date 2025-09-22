import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'
import { Poster } from '@vidstack/react'
console.log(import.meta.env)

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' '
    ),
    prompt: 'consent',
    access_type: 'offline'
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

const googleAuthUrl = getGoogleAuthUrl()

export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </span>
        <span>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </span>
      </div>
      <h2>Video streaming</h2>
      <video controls width={500}>
        <source src='http://localhost:4000/static/video-stream/m67rq5iwb0mv5wlii1ei2ieut.mp4' type='video/mp4' />
      </video>

      <h2>Video HLS</h2>
      <MediaPlayer title='Sprite Fight' src='http://localhost:4000/static/video-hls/MaC6h8LC1lcqmbSlxusXW/master.m3u8'>
        <MediaProvider>
        </MediaProvider>
        <DefaultVideoLayout
          thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>

      <h1>Google OAuth 2.0</h1>
      {isAuthenticated ? (
        <>
          <span>Hello, You have logged in successfully</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={googleAuthUrl}>Click to login with google</Link>
      )}
    </>
  )
}
