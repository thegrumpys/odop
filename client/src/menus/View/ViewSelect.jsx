import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { changeView } from '../../store/modelSlice';

export default function ViewSelect() {
//  console.log("ViewSelect - Mounting...");

  const model_type = useSelector((state) => state.modelSlice.model.type);
  const dispatch = useDispatch();

  var { getViewNames } = require('../../designtypes/' + model_type + '/view.js'); // Dynamically load getViewNames
//  console.log('ViewSelect - type changed', 'getViewNames=', getViewNames);
  var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//  console.log('ViewSelect - type changed', 'viewNames=', viewNames);

  const onClick = (event) => {
//    console.log('ViewSelect.onClick','event=',event);
    dispatch(changeView(event.target.id));
    logUsage('event', 'ViewSelect', { event_label: event.target.id });
  }

  return (
    <>
      {viewNames.map((element) => {
        return (
          <NavDropdown.Item key={element.title} id={element.name} onClick={onClick}>
            {element.title}
          </NavDropdown.Item>
        )
      })}
    </>
  );
}
