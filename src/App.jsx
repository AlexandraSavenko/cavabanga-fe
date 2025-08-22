import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
// import AuthPage from './pages/AuthPage/AuthPage'
// import Home from './pages/home/Home'
// import Signin from './pages/signin/Signin'
// import Signup from './pages/signup/signup'
import ProfilePage from './pages/profilePage/ProfilePage'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import("./pages/home/Home"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));

function App() {
return <Layout>
  <Suspense>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/signup" element={<Register/>} /> 
    <Route path="/signin" element={<Signin/>} />
    <Route path="/profile/:recipeType" element={<ProfilePage />} />
  </Routes>
  </Suspense>
</Layout>
}

export default App
