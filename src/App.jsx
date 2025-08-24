import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProfilePage from "./pages/profilePage/ProfilePage";
import NotFound from "./pages/NotFound/NotFound";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home/Home"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));

function App() {
  return (
    <>
      <Suspense fallback={ <div>Loading...</div> }>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route path="/profile/:recipeType" element={<ProfilePage />} />
          <Route path="/auth/:authType" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
