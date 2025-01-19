import { useContext } from "react";
import { useSelector } from "react-redux";
import ReportBaseContext from './ReportBaseContext';
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from '../../../components/Alerts';

export default function Report1() {
//  console.log('Report1 - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const base = useContext(ReportBaseContext);
//  console.log('Report1','base=',base);

  const onClick = (event) => {
//    console.log('In Report1.onClick event=',event);
    window.print();
    return false;
  }

  var line = 1;
  return (
    <>
      <h4 className="d-flex mt-3">
        <span className="me-auto">ODOP:Spring &nbsp; Extension Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
        <Button onClick={onClick}>Print</Button>
      </h4>
      <br />
      {base.hits > 0 ?
        <><b>Alerts:</b><ul>
          {getAlertsBySeverity(ERR).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li>)}
          {getAlertsBySeverity(WARN).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li>)}
          {getAlertsBySeverity(NOTICE).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li>)}
          {getAlertsBySeverity(INFO).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li>)}
        </ul></>
        : ''}
      {base.hits > 0 && base.startpntmsg}{base.hits > 0 && <br />}
      {base.hits > 0 && <br />}
      <table id="view1" className="report-table">
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
            <td>{model_symbol_table[o.End_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{base.et_tab[model_symbol_table[o.End_Type].value][0]}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Spring_Index].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Spring_Index].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Spring_Index].units}</td>
            <td />
            <td>{model_symbol_table[o.Coils_T].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Coils_T].value.toFixed(3)}</td>
            <td className="text-start">{"total " + model_symbol_table[o.Coils_T].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Rate].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Rate].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Rate].units}</td>
            <td />
            <td>{model_symbol_table[o.Coils_A].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Coils_A].value.toFixed(3)}</td>
            <td className="text-start">{"active " + model_symbol_table[o.Coils_A].units}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table id="view2" className="report-table">
        <thead>
          <tr>
            <td></td>
            <td className="text-center"><b>Force</b><br />{model_symbol_table[o.Force_1].units}</td>
            <td className="text-center"><b>Deflect</b><br />{model_symbol_table[o.L_Free].units}</td>
            <td className="text-center"><b>Length</b><br />{model_symbol_table[o.L_Free].units}</td>
            <td />
            <td className="text-center"><b>OD</b><br />{model_symbol_table[o.OD_Free].units}</td>
            <td className="text-center"><b>ID</b><br />{model_symbol_table[o.ID_Free].units}</td>
            <td />
            <td className="text-center"><b>Stress</b><br />{model_symbol_table[o.Stress_1].units}</td>
            <td className="text-center"><b>Static&nbsp;FS</b><br />{model_symbol_table[o.FS_2].units}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Initial</b></td>
            <td>{model_symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
            <td>{(0.0).toFixed(4)}</td>
            <td>{model_symbol_table[o.L_Free].value.toFixed(3)}</td>
            <td />
            <td>{model_symbol_table[o.OD_Free].value.toFixed(4)}</td>
            <td>{model_symbol_table[o.ID_Free].value.toFixed(4)}</td>
            <td />
            <td>{model_symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
            <td>{(model_symbol_table[o.Stress_Lim_Stat].value / model_symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>1</b></td>
            <td>{model_symbol_table[o.Force_1].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Deflect_1].value.toFixed(4)}</td>
            <td>{model_symbol_table[o.L_1].value.toFixed(3)}</td>
            <td />
            <td>{base.od_1.toFixed(4)}</td>
            <td>{base.id_1.toFixed(4)}</td>
            <td />
            <td>{model_symbol_table[o.Stress_1].value.toFixed(0)}</td>
            <td>{base.fs_1.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>2</b></td>
            <td>{model_symbol_table[o.Force_2].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Deflect_2].value.toFixed(4)}</td>
            <td>{model_symbol_table[o.L_2].value.toFixed(3)}</td>
            <td />
            <td>{base.od_2.toFixed(4)}</td>
            <td>{base.id_2.toFixed(4)}</td>
            <td />
            <td>{model_symbol_table[o.Stress_2].value.toFixed(0)}</td>
            <td>{model_symbol_table[o.FS_2].value.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>MaxSafe</b></td>
            <td>{base.safe_load.toFixed(2)}</td>
            <td>{base.safe_travel.toFixed(4)}</td>
            <td>{(model_symbol_table[o.L_Free].value + base.safe_travel).toFixed(3)}</td>
            <td />
            <td>{base.od_maxsafe.toFixed(4)}</td>
            <td>{base.id_maxsafe.toFixed(4)}</td>
            <td />
            <td>{model_symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
            <td>{(1.0).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table id="view3" className="report-table">
        <tbody>
          <tr>
            <td>Safe Load</td>
            <td>=</td>
            <td>{base.safe_load.toFixed(3)}</td>
            <td className="text-start">{base.safe_load_u}</td>
            <td />
            <td>{base.len_lbl}</td>
            <td>=</td>
            <td>{base.wire_len_t.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_Free].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.L_Stroke].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.L_Stroke].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.L_Stroke].units}</td>
            <td />
            <td>{model_symbol_table[o.Weight].name}</td>
            <td>=</td>
            <td>{base.wgt1000.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Weight].units + "/1000"}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Cycle_Life].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
            <td />
            <td>({model_symbol_table[o.Cycle_Life].name}</td>
            <td className="text-start" colSpan="4">applies to body coils only.)</td>
          </tr>
        </tbody>
      </table>
      <br />
      Deflection at load point 2 is {model_symbol_table[o.PC_Safe_Deflect].value.toFixed(0)}% of total safe deflection.<br />
      <br />
      <pre>
        |&lt;--------------------------- {model_symbol_table[o.L_Free].name} (w/ends) = {model_symbol_table[o.L_Free].value.toFixed(3)} ---------------------------&gt;|<br />
        |&lt;--- {model_symbol_table[o.L_End].name} ---&gt;|&lt;--- {model_symbol_table[o.L_Body].name} ---&gt;|&lt;--- {model_symbol_table[o.End_Extension].name} ---&gt;|&lt;--- {model_symbol_table[o.L_Extended_End].name} ---&gt;|<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {model_symbol_table[o.L_End].value.toFixed(3)}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {model_symbol_table[o.L_Body].value.toFixed(3)}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {model_symbol_table[o.End_Extension].value.toFixed(3)}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {model_symbol_table[o.L_Extended_End].value.toFixed(3)}
      </pre>
      <br />
    </>
  );
}
