import { InputGroup, Form } from 'react-bootstrap';
import { toODOPPrecision } from '../toODOPPrecision'

export default function Value({ id, className, value }) {
//  console.log('Value - Mounting...','id=',id,'value=',value);

  return (
    <>
      <td className={"align-middle " + (className !== undefined ? className : '')}>
        <InputGroup>
          {typeof value === 'number' ?
            <Form.Control id={'v_' + id} type="text" disabled={true} className="text-end" value={toODOPPrecision(value)} />
            :
            <Form.Control id={'v_' + id} type="text" disabled={true} className="text-end" value={value} />
          }
        </InputGroup>
      </td>
    </>
  );
}
