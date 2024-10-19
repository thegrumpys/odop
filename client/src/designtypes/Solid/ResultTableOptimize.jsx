import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actions';
import { logUsage } from '../../logUsage';
import * as sto from './symbol_table_offsets';

export default function ResultTableOptimize({ onClick }) {
//  console.log('ResultTableOptimize - Mounting...','onClick=',onClick);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const dispatch = useDispatch();

  const onOptimizeSeekMAXVolume = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXVolume','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Volume button' });
    dispatch(saveAutoSave());
    dispatch(seek('Volume', MAX));
    onClick(event);
  }

  const onOptimizeSeekMAXWeight = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXWeight','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Weight button' });
    dispatch(saveAutoSave());
    dispatch(seek('Weight', MAX));
    onClick(event);
  }

  const onOptimizeSeekMINLength = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINLength','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Length button' });
    dispatch(saveAutoSave());
    dispatch(seek('Length', MIN));
    onClick(event);
  }

  const onOptimizeSeekMINWidth = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWidth','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Width button' });
    dispatch(saveAutoSave());
    dispatch(seek('Width', MIN));
    onClick(event);
  }

  const onOptimizeSeekMINHeight = (event) => {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWidth','event=',event);
    logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Height button' });
    dispatch(saveAutoSave());
    dispatch(seek('Height', MIN));
    onClick(event);
  }

  return (
    <>
      <p>Select a pre-configured Seek optimization:</p>
      <Table borderless="true" size="sm" className="table-secondary">
        <tbody>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Volume].lmin & FIXED ? true : false} onClick={onOptimizeSeekMAXVolume}>Seek MAX Volume</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Weight].lmin & FIXED ? true : false} onClick={onOptimizeSeekMAXWeight}>Seek MAX Weight</Button>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Length].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINLength}>Seek MIN Length</Button>
            </td>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Width].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINWidth}>Seek MIN Width</Button>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <Button variant="primary" disabled={model_symbol_table[sto.Height].lmin & FIXED ? true : false} onClick={onOptimizeSeekMINHeight}>Seek MIN Height</Button>
            </td>
            <td width="50%">
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
