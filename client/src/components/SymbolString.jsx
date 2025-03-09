import { toODOPPrecision } from '../toODOPPrecision';

export default function SymbolString({ className, element }) {
  if (element.format === 'table') {
    var tableContents = require('../designtypes/' + element.table + '.json'); // Dynamically load table
    console.log('SymbolString','Mounting','tableContents=',tableContents);
  }
  return (
    <td className={"align-middle " + (className !== undefined ? className : '')}>
      {element.format === undefined && typeof element.value === 'number' ? toODOPPrecision(element.value) : ''}
      {element.format === undefined && typeof element.value === 'string' ? element.value : ''}
      {element.format === 'table' ? tableContents[element.value][0] : ''}
    </td>
  );
}
