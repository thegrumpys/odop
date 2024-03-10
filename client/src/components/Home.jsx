import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displaySpinner } from "./Spinner";
import { displayMessage } from "./MessageModal";
import { changeName, changeUser, changeView, loadInitialState, changeSymbolValue, changeIndexValue } from "../store/modelSlice";
import * as sto from '../designtypes/Piston-Cylinder/symbol_table_offsets';

export default function Home() {
//  console.log("HOME - Mounting..");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
 //   console.log("HOME - Mounted");
    setTimeout(() => {
//      console.log("Spinner disabled after 3seconds timeout to see it on startup");
      displaySpinner(false);
    }, 3000);
//    return () => console.log("Home - Unmounting...");
    return () => {};
  },[]);

  const linkPage = () => {
//    console.log("Going to Test page...");
    setTimeout(() => {
      dispatch(changeName('Test'));
//    setTimeout(() => {
      dispatch(changeUser('Anonymous'));
//    setTimeout(() => {
      dispatch(changeView('Calculator'));
//    setTimeout(() => {
      dispatch(loadInitialState('Piston-Cylinder'));
//    setTimeout(() => {
      dispatch(changeSymbolValue('THICKNESS', 10));
//    setTimeout(() => {
      dispatch(changeIndexValue(sto.THICKNESS, 20));
//    setTimeout(() => {
      displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
      displayMessage('Line 1', '');
      displayMessage('Line 2', 'success');
      displaySpinner(true);
      navigate("/test");
//    }, 2000);
//    }, 2000);
//    }, 2000);
//    }, 2000);
//    }, 2000);
//    }, 2000);
    }, 2000);
  };

  const name = useSelector((state) => state.model.name);
  const user = useSelector((state) => state.model.user);
  const view = useSelector((state) => state.model.view);
  const symbol_table = useSelector((state) => state.model.model.symbol_table);

  return (
    <div className="App">
      <h1>Spinner, MessageModal and Model implementation with Redux toolkit</h1>
      <ul style={{ textAlign: "left" }}>
        <li>Home is mounted only on startup page: Name: {name}, User: {user}, View: {view}</li>
        {symbol_table.map((element,index) => <li key={index}>{element.name} {element.value}</li>)}
      </ul>
      <button type="button" onClick={linkPage}>Go to Test</button>
    </div>
  );
};
