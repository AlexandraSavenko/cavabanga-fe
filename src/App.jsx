import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
// import Home from './pages/home/Home'
// import Signin from './pages/signin/Signin'
// import Signup from './pages/signup/signup'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import("./pages/home/Home"));
const Signin = lazy(() => import("./pages/signin/Signin"));
const Signup = lazy(() => import("./pages/signup/signup"));

function App() {
return <Layout>
  <Suspense>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />

  </Routes>
  </Suspense>
</Layout>
}

export default App
