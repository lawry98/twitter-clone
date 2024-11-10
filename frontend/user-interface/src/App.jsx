import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LandingPage } from './components/authentication/LandingPage'
import { RegisterPage } from './components/authentication/RegisterPage'
import { LoginPage } from './components/authentication/LoginPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex max-w-6xl mx-auto'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</div>
  )
}

export default App
