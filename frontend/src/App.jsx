import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
