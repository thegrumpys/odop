import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function SymbolName({ className, element, index }) {
//  console.log('SymbolName - Mounting...','element=',element,'index=',index);

  return (
    <td className={"align-middle " + (className !== undefined ? className : '')} id={'sn_' + element.name}>
      <OverlayTrigger placement="top" overlay={element.tooltip !== undefined && <Tooltip><div dangerouslySetInnerHTML={{__html: element.tooltip}}></div></Tooltip>}>
        <span>{element.name}</span>
      </OverlayTrigger>
    </td>
  );
}
