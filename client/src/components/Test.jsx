import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { displaySpinner } from "./Spinner";

export default Test = () => {
//  console.log("Test - Mounting...");
  const navigate = useNavigate();

  useEffect(() => {
//    console.log("Test - Mounted");
    setTimeout(() => {
//      console.log("Spinner disabled after 3seconds timeout to see it on startup");
      displaySpinner(false);
    }, 3000);
//    return () => console.log("Test - Unmounting...");
    return () => {};
  });

  const linkPage = () => {
//    console.log("Going to Home page...");
    setTimeout(() => {
      displaySpinner(true);
      navigate("/");
    }, 1000);
  };

  const name = useSelector((state) => state.model.name);
  const user = useSelector((state) => state.model.user);
  const view = useSelector((state) => state.model.view);
  const symbol_table = useSelector((state) => state.model.model.symbol_table);

  return (
    <>
      <h1>Test Page: Name: {name}, User: {user}, View: {view}</h1>
      <ul style={{ textAlign: "left" }}>
        <li>Home is mounted only on startup page: Name: {name}, User: {user}, View: {view}</li>
        {symbol_table.map((element,index) => <li key={index}>{element.name} {element.value}</li>)}
      </ul>
      <button type="button" onClick={linkPage}>Go to Home</button>
    </>
  );
};
