import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllQuestion from "./pages/question/AllQuestion";
import ChallegeRoom from "./pages/room/ChallegeRoom";
import Login from "./pages/login/Login";
import NavBar from "./components/app-bar/NavBar";
import NotFound from "./pages/not-found/NotFound";
import Question from "./pages/question/Question";
import React from "react";
import Rooms from "./pages/room/Rooms";
import Signup from "./pages/signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/challege-room/:roomId" element={<ChallegeRoom />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/questions" element={<AllQuestion />} />
        <Route path="/about" element={<NotFound />} />
        <Route path="/question/:slug" element={<Question />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // </>
  );
}

export default App;
