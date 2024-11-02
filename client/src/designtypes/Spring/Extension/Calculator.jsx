import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, InputGroup, Form } from 'react-bootstrap';
import ReportBaseContext from './ReportBaseContext';
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';

export default function Calculator() {
//  console.log('Calculator - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const base = useContext(ReportBaseContext);
//  console.log('Calculator','base=',base);

  return (
    <Container>
      <Row>
        <table className="w-auto report-table">
          <tbody>
            <tr>
              <SymbolName element={model_symbol_table[o.Material_Type]} index={o.Material_Type} />
              {model_symbol_table[o.Prop_Calc_Method].value === 1 ?
                <SymbolValue element={model_symbol_table[o.Material_Type]} index={o.Material_Type} />
                :
                <Value id="Material_Type" value={base.matTypeValue} />
              }
              <SymbolUnits element={model_symbol_table[o.Material_Type]} index={o.Material_Type} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={model_symbol_table[o.End_Type]} index={o.End_Type} />
              <SymbolValue element={model_symbol_table[o.End_Type]} index={o.End_Type} />
              <SymbolUnits element={model_symbol_table[o.End_Type]} index={o.End_Type} className="text-start" />
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-auto report-table">
          <thead>
            <tr>
              <th></th>
              <ValueName name={<><b>Length</b><br />{model_symbol_table[o.L_Free].units}</>} tooltip="Length at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Deflection</b><br />{model_symbol_table[o.L_Free].units}</>} tooltip="Deflection at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Force</b><br />{model_symbol_table[o.Force_1].units}</>} tooltip="Force at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>OD</b><br />{model_symbol_table[o.OD_Free].units}</>} tooltip="Outside Diameter at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>ID</b><br />{model_symbol_table[o.ID_Free].units}</>} tooltip="Inside Diameter at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Stress</b><br />{model_symbol_table[o.Stress_1].units}</>} tooltip="Stress at initial point, point 1, point 2 and maximum safe point" className="text-center" />
              <ValueName name={<><b>Static FS</b><br />{model_symbol_table[o.FS_2].units}</>} tooltip="Static Factor of Safety at initial point, point 1, point 2 and maximum safe point" className="text-center" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <ValueName name={<b>Initial</b>} tooltip="Initial tension point" />
              <SymbolValue element={model_symbol_table[o.L_Free]} index={o.L_Free} />
              <Value id="Deflection_Free" value={0.0} />
              <SymbolValue element={model_symbol_table[o.Initial_Tension]} index={o.Initial_Tension} />
              <SymbolValue element={model_symbol_table[o.OD_Free]} index={o.OD_Free} />
              <SymbolValue element={model_symbol_table[o.ID_Free]} index={o.ID_Free} />
              <SymbolValue element={model_symbol_table[o.Stress_Initial]} index={o.Stress_Initial} />
              <Value id="Static FS_Free" value={(model_symbol_table[o.Stress_Lim_Stat].value / model_symbol_table[o.Stress_Initial].value)} />
            </tr>
            <tr>
              <ValueName name={<b>1</b>} tooltip="Point 1 (minimum operating load)" />
              <SymbolValue element={model_symbol_table[o.L_1]} index={o.L_1} />
              <SymbolValue element={model_symbol_table[o.Deflect_1]} index={o.Deflect_1} />
              <SymbolValue element={model_symbol_table[o.Force_1]} index={o.Force_1} />
              <Value id="OD_1" value={base.od_1} />
              <Value id="ID_1" value={base.id_1} />
              <SymbolValue element={model_symbol_table[o.Stress_1]} index={o.Stress_1} />
              <Value id="Static FS_1" value={base.fs_1} />
            </tr>
            <tr>
              <ValueName name={<b>2</b>} tooltip="Point 2 (maximum operating load)" />
              <SymbolValue element={model_symbol_table[o.L_2]} index={o.L_2} />
              <SymbolValue element={model_symbol_table[o.Deflect_2]} index={o.Deflect_2} />
              <SymbolValue element={model_symbol_table[o.Force_2]} index={o.Force_2} />
              <Value id="OD_2" value={base.od_2} />
              <Value id="ID_2" value={base.id_2} />
              <SymbolValue element={model_symbol_table[o.Stress_2]} index={o.Stress_2} />
              <SymbolValue element={model_symbol_table[o.FS_2]} index={o.FS_2} />
            </tr>
            <tr>
              <ValueName name={<b>Max Safe</b>} tooltip="Greatest static load that can be supported without exceeding maximum allowable stress (Stress_Lim_Stat)" />
              <Value id="Length_Max_Safe" value={(model_symbol_table[o.L_Free].value + base.safe_travel)} />
              <Value id="Deflection_Max_Safe" value={base.safe_travel} />
              <Value id="Force_Max_Safe" value={base.safe_load} />
              <Value id="OD_Max_Safe" value={base.od_maxsafe} />
              <Value id="ID_Max_Safe" value={base.id_maxsafe} />
              <SymbolValue element={model_symbol_table[o.Stress_Lim_Stat]} index={o.Stress_Lim_Stat} />
              <Value id="Static_FS_Max_Safe" value={1.0} />
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-auto report-table">
          <tbody>
            <tr>
              <SymbolName element={model_symbol_table[o.L_Stroke]} index={o.L_Stroke} />
              <SymbolValue element={model_symbol_table[o.L_Stroke]} index={o.L_Stroke} />
              <SymbolUnits element={model_symbol_table[o.L_Stroke]} index={o.L_Stroke} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={model_symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
              <SymbolValueWireDia element={model_symbol_table[o.Wire_Dia]} index={o.Wire_Dia} />
              <SymbolUnits element={model_symbol_table[o.Wire_Dia]} index={o.Wire_Dia} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={model_symbol_table[o.Coils_T]} index={o.Coils_T} />
              <SymbolValue element={model_symbol_table[o.Coils_T]} index={o.Coils_T} />
              <SymbolUnits element={model_symbol_table[o.Coils_T]} index={o.Coils_T} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={model_symbol_table[o.Spring_Index]} index={o.Spring_Index} />
              <SymbolValue element={model_symbol_table[o.Spring_Index]} index={o.Spring_Index} />
              <SymbolUnits element={model_symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={model_symbol_table[o.Coils_A]} index={o.Coils_A} />
              <SymbolValue element={model_symbol_table[o.Coils_A]} index={o.Coils_A} />
              <SymbolUnits element={model_symbol_table[o.Coils_A]} index={o.Coils_A} className="text-start" />
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={model_symbol_table[o.Rate]} index={o.Rate} />
              <SymbolValue element={model_symbol_table[o.Rate]} index={o.Rate} />
              <SymbolUnits element={model_symbol_table[o.Rate]} index={o.Rate} className="text-start" />
            </tr>
            <tr>
              <SymbolName element={model_symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
              <SymbolValue element={model_symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
              <td className="text-start">{base.cycle_life_u}</td>
              <td> &nbsp; &nbsp; </td>
              <SymbolName element={model_symbol_table[o.Weight]} index={o.Weight} />
              <SymbolValue element={model_symbol_table[o.Weight]} index={o.Weight} />
              <SymbolUnits element={model_symbol_table[o.Weight]} index={o.Weight} className="text-start" />
            </tr>
            <tr>
              <td />
              <td className="text-start" colSpan="2">({model_symbol_table[o.Cycle_Life].name} applies to body coils only.)</td>
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <table className="w-auto report-table">
          <tbody>
            <tr>
              <td>
                Deflection at point 2 (maximum operating load) is
              </td>
              <SymbolValue element={model_symbol_table[o.PC_Safe_Deflect]} index={o.PC_Safe_Deflect} />
              <td>
                % of total safe deflection.
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
      <br />
      <Row>
        <pre>
          <table className="report-table">
            <tbody>
              <tr>
                <td className="text-start" colSpan="3">|&lt;---</td>
                <SymbolName className="text-end" element={model_symbol_table[o.L_Free]} index={o.L_Free} />
                <td>(w/ends)&nbsp;=</td>
                <SymbolValue element={model_symbol_table[o.L_Free]} index={o.L_Free} />
                <td className="text-end" colSpan="3">----&gt;|</td>
              </tr>
              <tr>
                <td className="text-start">|&lt;---</td>
                <SymbolName className="text-center" element={model_symbol_table[o.L_End]} index={o.L_End} />
                <td className="text-center">----&gt;|&lt;---</td>
                <SymbolName className="text-center" element={model_symbol_table[o.L_Body]} index={o.L_Body} />
                <td className="text-center">----&gt;|&lt;---</td>
                <SymbolName className="text-center" element={model_symbol_table[o.End_Extension]} index={o.End_Extension} />
                <td className="text-center">----&gt;|&lt;---</td>
                <SymbolName className="text-center" element={model_symbol_table[o.L_Extended_End]} index={o.L_Extended_End} />
                <td className="text-end">----&gt;|</td>
              </tr>
              <tr>
                <td />
                <SymbolValue className="text-center" element={model_symbol_table[o.L_End]} index={o.L_End} />
                <td />
                <SymbolValue className="text-center" element={model_symbol_table[o.L_Body]} index={o.L_Body} />
                <td />
                <SymbolValue className="text-center" element={model_symbol_table[o.End_Extension]} index={o.End_Extension} />
                <td />
                <SymbolValue className="text-center" element={model_symbol_table[o.L_Extended_End]} index={o.L_Extended_End} />
                <td />
              </tr>
            </tbody>
          </table>
        </pre>
      </Row>
      <br />
    </Container>
  );
}
