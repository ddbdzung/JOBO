import React, { Suspense } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Signin from "./components/Signin";
import CreateAcc from "./components/CreateAcc";

function App() {
  // const isLogin = localStorage.getItem('isLogin')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={isLogin ? <Home /> : Navigate('/signin')} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/createacc" element={<CreateAcc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
