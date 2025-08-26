import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';

import RestrictedRoute from "./components/RestrictedRoute";


const Loader = lazy(() => import('./components/loader/Loader'));
const Layout = lazy(() => import('./components/layout/Layout'));
const MainPage = lazy(() => import('./pages/mainPage/MainPage'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const ProfilePage = lazy(() => import('./pages/profilePage/ProfilePage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const AddRecipesPage = lazy(() => import('./pages/addRecipePage/AddRecipesPage'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route
            path="/add-recipe"
            element={
              <RestrictedRoute
                component={<AddRecipesPage/>}
                redirectTo="/auth/login"
              />
            }
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
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

