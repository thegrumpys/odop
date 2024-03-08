import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Test } from "./Test";
import { useEffect } from "react";

export default function App() {
//  console.log("APP - Mounting...");

  useEffect(() => {
//    console.log("APP - Mounted");
//    return () => console.log("APP - Unmounting ...");
    return () => {};
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
