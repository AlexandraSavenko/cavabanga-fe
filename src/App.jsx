import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import RecipesList from "./components/loadMoreBtn/LoadMoreBtn";

const Layout = lazy(() => import("./components/layout/Layout"));
const MainPage = lazy(() => import("./pages/mainPage/MainPage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const ProfilePage = lazy(() => import("./pages/profilePage/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <Suspense fallback={ <div>Loading...</div> }>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>} />
          <Route path="/profile/:recipeType" element={<ProfilePage />} />
          <Route path="/auth/:authType" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/list" element={<RecipesList />}/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
