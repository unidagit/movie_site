import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv/:id" element={<Tv />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="movies/:id" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  );
}

export default App;
