import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import ProfilePage from './pages/profilePage/ProfilePage'
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';

import { lazy, Suspense } from 'react'

const Home = lazy(() => import("./pages/home/Home"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));

function App() {
return <Layout>
  <Suspense>
  <Routes>
    <Route path="/" element={<Home/>} />
      <Route path="/profile/:recipeType" element={<ProfilePage />} />
      <Route path="/auth/:authType" element={<AuthPage />} />
      <Route path="/add-recipe" element={<AddRecipePage />} />
  </Routes>
  </Suspense>
</Layout>
}

export default App
