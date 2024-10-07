import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import * as sto from './symbol_table_offsets';

export default function ResultTableOptimize({onClick}) {
//  console.log('ResultTableOptimize - Mounting...','onClick=',onClick);
  const model_symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const dispatch = useDispatch();

  const onOptimizeSeekMAXFORCE = (event) => {
//    console.log('In ResultTableOptimize.onOptimizeSeekMAXFORCE','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX FORCE button' });
    dispatch(saveAutoSave());
    dispatch(seek('FORCE', MAX));
    onClick(event);
  }

  const onOptimizeSeekMINRADIUS = (event) => {
//    console.log('In ResultTableOptimize.onOptimizeSeekMINRADIUS','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN RADIUS button' });
    dispatch(saveAutoSave());
    dispatch(seek('RADIUS', MIN));
    onClick(event);
  }

  const onOptimizeSeekMINPRESSURE = (event) => {
//    console.log('In ResultTableOptimize.onOptimizeSeekMINPRESSURE','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN PRESSURE button' });
    dispatch(saveAutoSave());
    dispatch(seek('PRESSURE', MIN));
    onClick(event);
  }

  const onOptimizeSeekMINSTRESS = (event) => {
//    console.log('In ResultTableOptimize.onOptimizeSeekMINSTRESS','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN STRESS button' });
    dispatch(saveAutoSave());
    dispatch(seek('STRESS', MIN));
    onClick(event);
  }

  return (
    <>
      <p>Select a pre-configured Seek optimization:</p>
      <Table borderless="true" size="sm" className="table-secondary">
        <tbody>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.FORCE].lmin & FIXED ? true : false} onClick={onOptimizeSeekMAXFORCE}>Seek MAX FORCE</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.RADIUS].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINRADIUS}>Seek MIN RADIUS</Button>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.PRESSURE].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINPRESSURE}>Seek MIN PRESSURE</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.STRESS].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINSTRESS}>Seek MIN STRESS</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
