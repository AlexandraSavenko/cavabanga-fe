import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import RestrictedRoute from "./components/RestrictedRoute";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "./redux/auth/selectors";
import { getUserData } from "./redux/auth/operations";

const Loader = lazy(() => import("./components/loader/Loader"));
const Layout = lazy(() => import("./components/layout/Layout"));
const MainPage = lazy(() => import("./pages/mainPage/MainPage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const ProfilePage = lazy(() => import("./pages/profilePage/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const AddRecipesPage = lazy(() =>
  import("./pages/addRecipePage/AddRecipesPage")
);
// const RecipeDetails = lazy(() => import("./pages/recipeDetails/RecipeDetails"));

function App() {
  const token = useSelector(selectToken)
  const dispatch = useDispatch()

  useEffect(() => {if(token){
    dispatch(getUserData())
  }}, [dispatch, token])
  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/add-recipe"
            element={
              <RestrictedRoute
                component={<AddRecipesPage />}
                redirectTo="/auth/login"
              />
            }
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path="/profile/:recipeType"
              element={
                <RestrictedRoute
                  component={<ProfilePage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route path="/auth/:authType" element={<AuthPage />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        reverseOrder={false}
        duration="3000" />
    </>
  );
}

export default App;
