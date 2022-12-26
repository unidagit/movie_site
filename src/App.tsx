import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tv from "./pages/Tv";
import { ReactQueryDevtools } from "react-query/devtools";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Login from "./Components/login/Login";
import PrivateRoute from "./Route";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

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
          path="/"
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
