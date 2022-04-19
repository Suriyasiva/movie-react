import "./App.css";
import Form from "./Form";
import EditMovieData from "./EditMovieData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/editmoviedata/:id" element={<EditMovieData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
