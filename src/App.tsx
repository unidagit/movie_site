import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tv from "./pages/Tv";
import { ReactQueryDevtools } from "react-query/devtools";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Login from "./Components/login/Login";
import { PrivateRoute } from "./Route";
// import { PublicRoute } from "./Route";
import Init from "./pages/Init";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public page */}
        <Route path="/" element={<Init />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* private page */}
        <Route
          path="/tv/:id"
          element={
            <PrivateRoute>
              <Tv />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/tv"
          element={
            <PrivateRoute>
              <Tv />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/search/movie/:movieId"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/search/tv/:movieId"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="movies/:id"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  );
}

export default App;
