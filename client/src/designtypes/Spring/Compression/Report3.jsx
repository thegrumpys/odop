import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportBaseContext from './ReportBaseContext';
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';

export default function Report3() {
//  console.log('Report3 - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_labels = useSelector((state) => state.model.labels);
  const base = useContext(ReportBaseContext);
//  console.log('Report3','base=',base);

  const onClick = (event) => {
//    console.log('In Report3.onClick event=',event);
    window.print();
    return false;
  }

  return (
    <>
      <h4 className="d-flex mt-3">
        <span className="me-auto">ODOP:Spring &nbsp; Compression Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
        <Button onClick={onClick}>Print</Button>
      </h4>
      <br />
      <table id="view1" className="report-table">
        <tbody>
          <tr>
            <td>{model_labels[o.Contact_person].name}:</td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Contact_person].value}</td>
            <td />
            <td>{model_labels[o.Phone___email].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Phone___email].value}</td>
          </tr>
          <tr>
            <td>{model_labels[o.Company_name].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Company_name].value}</td>
            <td />
            <td>{model_labels[o.Date].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Date].value}</td>
          </tr>
          <tr>
            <td>{model_labels[o.Street].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Street].value}</td>
            <td />
            <td>{model_labels[o.Part_Number].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.Part_Number].value}</td>
          </tr>
          <tr>
            <td>{model_labels[o.City__State___Zip].name}: </td>
            <td />
            <td className="text-start" width="30%">{model_labels[o.City__State___Zip].value}</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
      <b>{model_labels[o.COMMENT].name}: &nbsp; </b> {model_labels[o.COMMENT].value} <br />
      <br />
      <table id="view2" className="report-table">
        <tbody>
          <tr>
            <td>{model_symbol_table[o.Spring_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{model_symbol_table[o.Spring_Type].value}</td>
            <td />
            <td>{model_symbol_table[o.Material_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{base.matTypeValue}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Wire_Dia].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
            <td className="text-start">{model_symbol_table[o.Wire_Dia].units}</td>
            <td />
            <td>{model_symbol_table[o.ASTM_Fed_Spec].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{base.astmFedSpecValue}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Mean_Dia].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Mean_Dia].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Mean_Dia].units}</td>
            <td />
            <td>{model_symbol_table[o.Tensile].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Tensile].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Tensile].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Spring_Index].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Spring_Index].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Spring_Index].units}</td>
            <td />
            <td>{model_symbol_table[o.End_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{base.et_tab[model_symbol_table[o.End_Type].value][0]}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Rate].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Rate].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Rate].units}</td>
            <td />
            <td>{model_symbol_table[o.Coils_T].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Coils_T].value.toFixed(3)}</td>
            <td className="text-start">{"total " + model_symbol_table[o.Coils_T].units}</td>
          </tr>
          <tr>
            <td>Pitch</td>
            <td>=</td>
            <td>{base.pitch.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_Free].units}</td>
            <td />
            <td>{model_symbol_table[o.Coils_A].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Coils_A].value.toFixed(3)}</td>
            <td className="text-start">{"active " + model_symbol_table[o.Coils_A].units}</td>
          </tr>
          <tr>
            <td>Helix Angle</td>
            <td>=</td>
            <td>{base.hlx_ang.toFixed(2)}</td>
            <td className="text-start">degrees</td>
            <td />
            <td>{base.len_lbl}</td>
            <td>=</td>
            <td>{base.wire_len_t.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_Free].units}</td>
          </tr>
          <tr>
            <td>Safe Load</td>
            <td>=</td>
            <td>{base.safe_load.toFixed(3)}</td>
            <td className="text-start">{base.safe_load_u}</td>
            <td />
            <td>{model_symbol_table[o.Weight].name}</td>
            <td>=</td>
            <td>{base.wgt1000.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Weight].units + "/1000"}</td>
          </tr>
          <tr>
            <td>Safe Travel</td>
            <td>=</td>
            <td>{base.safe_travel.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_Free].units}</td>
            <td />
            <td>{model_symbol_table[o.Cycle_Life].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table id="view3" className="report-table">
        <thead>
          <tr>
            <th />
            <th className="text-end" width="15%">Free </th>
            <th className="text-end" width="15%">1st&nbsp;Load</th>
            <th className="text-end" width="15%">2nd&nbsp;Load</th>
            <th className="text-end" width="15%">Solid</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Force</b></td>
            <td>{(0.0).toFixed(2)}</td>
            <td>{model_symbol_table[o.Force_1].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Force_2].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Force_Solid].value.toFixed(2)}</td>
            <td className="text-start" colSpan="2">{model_symbol_table[o.Force_1].units}</td>
          </tr>
          <tr>
            <td><b>Deflection</b></td>
            <td>{(0.0).toFixed(3)}</td>
            <td>{model_symbol_table[o.Deflect_1].value.toFixed(3)}</td>
            <td>{model_symbol_table[o.Deflect_2].value.toFixed(3)}</td>
            <td>{(model_symbol_table[o.L_Free].value - model_symbol_table[o.L_Solid].value).toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Deflect_2].units}</td>
          </tr>
          <tr>
            <td><b>Length</b></td>
            <td>{model_symbol_table[o.L_Free].value.toFixed(3)}</td>
            <td>{model_symbol_table[o.L_1].value.toFixed(3)}</td>
            <td>{model_symbol_table[o.L_2].value.toFixed(3)}</td>
            <td>{model_symbol_table[o.L_Solid].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_1].units}</td>
          </tr>
          <tr>
            <td><b>Outside Dia.</b></td>
            <td>{model_symbol_table[o.OD_Free].value.toFixed(3)}</td>
            <td>{base.od_1.toFixed(3)}</td>
            <td>{base.od_2.toFixed(3)}</td>
            <td>{base.od_solid.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.OD_Free].units}</td>
          </tr>
          <tr>
            <td><b>Inside Dia.</b></td>
            <td>{model_symbol_table[o.ID_Free].value.toFixed(3)}</td>
            <td>{base.id_1.toFixed(3)}</td>
            <td>{base.id_2.toFixed(3)}</td>
            <td>{(base.od_solid - 2.0 * model_symbol_table[o.Wire_Dia].value).toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.ID_Free].units}</td>
          </tr>
          <tr>
            <td><b>Energy</b></td>
            <td>{(0.0).toFixed(2)}</td>
            <td>{base.energy_1.toFixed(2)}</td>
            <td>{base.energy_2.toFixed(2)}</td>
            <td>{base.energy_S.toFixed(2)}</td>
            <td className="text-start">{model_symbol_table[o.Energy].units}</td>
          </tr>
          <tr>
            <td><b>Stress</b><sup>*</sup></td>
            <td>{(0.0).toFixed(0)}</td>
            <td>{model_symbol_table[o.Stress_1].value.toFixed(0)}</td>
            <td>{model_symbol_table[o.Stress_2].value.toFixed(0)}</td>
            <td>{model_symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_1].units}</td>
          </tr>
          <tr>
            <td><b>% Tensile</b><sup>*</sup></td>
            <td>{(0.0).toFixed(1)}</td>
            <td>{(model_symbol_table[o.Stress_1].value / base.dhat).toFixed(1)}</td>
            <td>{(model_symbol_table[o.Stress_2].value / base.dhat).toFixed(1)}</td>
            <td>{(model_symbol_table[o.Stress_Solid].value / base.dhat).toFixed(1)}</td>
            <td className="text-start">%</td>
          </tr>
          <tr>
            <td><b>Static F.S.</b><sup>*</sup></td>
            <td>Infinity</td>
            <td>{base.fs_1.toFixed(2)}</td>
            <td>{model_symbol_table[o.FS_2].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.FS_Solid].value.toFixed(2)}</td>
            <td className="text-start">{model_symbol_table[o.FS_Solid].units}</td>
          </tr>
          <tr>
            <td />
            <td className="text-start" colSpan="5"><sup>*</sup> without pre-set &nbsp; kw = {base.kw1.toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
      <br />
      Deflection at 2nd load is {model_symbol_table[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.<br />
      {base.pcadmsg}{base.pcadmsg !== undefined && <br />}
      {base.errmsg1}{base.errmsg1 !== undefined && <br />}
      {base.errmsg0}
      <hr />
      <table id="view4" className="report-table">
        <tbody>
          <tr>
            <td className="text-start">{model_labels[o.Data_Source].name}: </td>
            <td />
            <td className="text-start" colSpan="4">{model_labels[o.Data_Source].value}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Mandril].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Mandril].value}</td>
            <td className="text-start">{model_symbol_table[o.ID_Free].units}</td>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Wind].name}: </td>
            <td />
            <td className="text-start" colSpan="2">{model_labels[o.Wind].value}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Shot_peen].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Shot_peen].value}</td>
            <td colSpan="3" className="text-start">{"(calculations assume: " + base.peenValue + ")"}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Stress_relieve_HT].name}: </td>
            <td />
            <td className="text-start" colSpan="4">{model_labels[o.Stress_relieve_HT].value}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Pre_set].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Pre_set].value}</td>
            <td className="text-start" colSpan="3">(calculations assume: No pre-set)</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Finish].name}: </td>
            <td />
            <td className="text-start" colSpan="4">{model_labels[o.Finish].value}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Squareness].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Squareness].value}</td>
            <td className="text-start">deg.</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.End_use].name}: </td>
            <td />
            <td className="text-start" colSpan="4">{model_labels[o.End_use].value}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Fits_in___Works_over].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Fits_in___Works_over].value}</td>
            <td className="text-start">{model_symbol_table[o.ID_Free].units}</td>
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Operating_temp].name}: </td>
            <td />
            <td className="text-start">{model_labels[o.Operating_temp].value}</td>
            <td />
          </tr>
          <tr>
            <td className="text-start">{model_labels[o.Special_notes___tol].name}: </td>
            <td />
            <td className="text-start" colSpan="4">{model_labels[o.Special_notes___tol].value}</td>
          </tr>
          <tr>
            <td />
          </tr>
        </tbody>
      </table>
      <hr />
      <table id="view5" className="report-table">
        <tbody>
          <tr>
            <td className="text-center" colSpan="2">approved for mfg.</td>
            <td />
            <td> &nbsp; &nbsp; </td>
            <td className="text-center" colSpan="2">approved for mfg.</td>
            <td />
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="2">by {model_labels[o.Customer_approval].value}</td>
            <td>date {model_labels[o.Customer_date].value}</td>
            <td> &nbsp; &nbsp; </td>
            <td colSpan="2">by {model_labels[o.Vendor_approval].value}</td>
            <td>date {model_labels[o.Vendor_date].value}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
}
