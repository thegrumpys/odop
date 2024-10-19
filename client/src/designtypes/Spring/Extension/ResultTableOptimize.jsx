import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import { MIN, MAX, FIXED } from '../../../store/actionTypes';
import { seek, saveAutoSave } from '../../../store/actions';
import { logUsage } from '../../../logUsage';
import * as sto from './symbol_table_offsets';

export default function ResultTableOptimize({ onClick }) {
//  console.log('ResultTableOptimize - Mounting...','onClick=',onClick);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const dispatch = useDispatch();

  const onOptimizeSeekMINWeight = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWeight','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Weight button' });
    dispatch(saveAutoSave());
    dispatch(seek('Weight', MIN));
    onClick(event);
  }

  const onOptimizeSeekMAXCycle_Life = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXCycle_Life','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Cycle_Life button' });
    dispatch(saveAutoSave());
    dispatch(seek('Cycle_Life', MAX));
    onClick(event);
  }

  const onOptimizeSeekMINRate = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINRate','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Rate button' });
    dispatch(saveAutoSave());
    dispatch(seek('Rate', MIN));
    onClick(event);
  }

  const onOptimizeSeekMAXL_Stroke = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXL_Stroke','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX L_Stroke button' });
    dispatch(saveAutoSave());
    dispatch(seek('L_Stroke', MAX));
    onClick(event);
  }

  return (
    <>
      <p>Select a pre-configured Seek optimization:</p>
      <Table borderless="true" size="sm" className="table-secondary">
        <tbody>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Weight].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINWeight}>Seek MIN Weight</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Cycle_Life].lmin & FIXED ? true : false} onClick={onOptimizeSeekMAXCycle_Life}>Seek MAX Cycle_Life</Button>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Rate].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINRate}>Seek MIN Rate</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.L_Stroke].lmin & FIXED ? true : false} onClick={onOptimizeSeekMAXL_Stroke}>Seek MAX L_Stroke</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
