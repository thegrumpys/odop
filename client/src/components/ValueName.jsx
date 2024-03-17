import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Value({ className, name, tooltip }) {
//  console.log("Value - Mounting...",'id=',id,'value=',value);

  return (
    <td className={"align-middle " + (className !== undefined ? className : '')} id={'vn_' + name}>
      <OverlayTrigger placement="top" overlay={tooltip !== undefined && <Tooltip>{tooltip}</Tooltip>}>
        <span>{name}</span>
      </OverlayTrigger>
    </td>
  );
}
