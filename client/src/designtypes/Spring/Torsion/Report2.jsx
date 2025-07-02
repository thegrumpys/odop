import { useContext } from "react";
import { useSelector } from "react-redux";
import ReportBaseContext from './ReportBaseContext';
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';

export default function Report2() {
//  console.log('Report2 - Mounting...');
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const base = useContext(ReportBaseContext);
//  console.log('Report2','base=',base);

  const onClick = (event) => {
//    console.log('Report2.onClick event=',event);
    window.print();
    return false;
  }

  return (
    <>
      <h4 className="d-flex mt-3">
        <span className="me-auto">ODOP:Spring &nbsp; Torsion Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
        <Button onClick={onClick}>Print</Button>
      </h4>
      <br />
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
            <td>{model_symbol_table[o.Elastic_Modulus].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Elastic_Modulus].value}</td>
            <td className="text-start">{model_symbol_table[o.Elastic_Modulus].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Spring_Index].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Spring_Index].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Spring_Index].units}</td>
            <td />
            <td>{model_symbol_table[o.Tensile].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Tensile].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Tensile].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Rate].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Rate].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Rate].units}</td>
            <td />
          </tr>
        </tbody>
      </table>
      <hr />
      <table id="view2" className="report-table">
        <tbody>
          <tr>
            <td colSpan="5"></td>
            <td colSpan="4" className="text-center">----- kb = {base.kb.toFixed(3)} -----</td>
          </tr>
          <tr>
            <td />
            <td className="text-center"><b>Moment</b><br />{model_symbol_table[o.M_1].units}</td>
            <td className="text-center"><b>Deflect</b><br />{model_symbol_table[o.Deflect_1].units}</td>
            <td className="text-center"><b>Length</b><br />{model_symbol_table[o.L_Body].units}</td>
            <td />
            <td />
            <td className="text-center"><b>Stress</b><br />{model_symbol_table[o.Stress_1].units}</td>
            <td className="text-center"><b>%TS</b><br />%</td>
            <td className="text-center"><b>Static&nbsp;FS</b><br />{model_symbol_table[o.FS_2].units}</td>
            <td />
            <td className="text-center"><b>Energy</b><br />{model_symbol_table[o.Energy].units}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td><b>Free</b></td>
            <td>{(0.0).toFixed(2)}</td>
            <td>{(0.0).toFixed(1)}</td>
            <td>{model_symbol_table[o.L_Body].value.toFixed(3)}</td>
            <td />
            <td />
            <td>{(0.0).toFixed(0)}</td>
            <td>{(0.0).toFixed(1)}</td>
            <td>Infinity</td>
            <td />
            <td>{(0.0).toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>1</b></td>
            <td>{model_symbol_table[o.M_1].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Deflect_1].value.toFixed(1)}</td>
            <td>{model_symbol_table[o.L_1].value.toFixed(3)}</td>
            <td />
            <td />
            <td>{model_symbol_table[o.Stress_1].value.toFixed(0)}</td>
            <td>{(model_symbol_table[o.Stress_1].value / base.dhat).toFixed(1)}</td>
            <td>{base.fs_1.toFixed(2)}</td>
            <td />
            <td>{base.energy_1.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>2</b></td>
            <td>{model_symbol_table[o.M_2].value.toFixed(2)}</td>
            <td>{model_symbol_table[o.Deflect_2].value.toFixed(1)}</td>
            <td>{model_symbol_table[o.L_2].value.toFixed(3)}</td>
            <td />
            <td />
            <td>{model_symbol_table[o.Stress_2].value.toFixed(0)}</td>
            <td>{(model_symbol_table[o.Stress_2].value / base.dhat).toFixed(1)}</td>
            <td>{model_symbol_table[o.FS_2].value.toFixed(2)}</td>
            <td />
            <td>{base.energy_2.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>Max Safe</b></td>
            <td>{base.safe_load.toFixed(2)}</td>
            <td>{base.def_max.toFixed(1)}</td>
            <td>{base.l_max.toFixed(3)}</td>
            <td />
            <td />
            <td>{model_symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
            <td>{(model_symbol_table[o.Stress_Lim_Bnd_Stat].value / base.dhat).toFixed(1)}</td>
            <td>{1.0.toFixed(2)}</td>
            <td />
            <td>{base.energy_MS.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <br />
      Calculations assume: {base.peenValue}, {base.heattreatValue}
      <hr />
      <b>Stress Details</b>
      <table id="view4" className="report-table">
        <tbody>
          <tr>
            <td>Helix Angle</td>
            <td>=</td>
            <td>{base.hlx_ang.toFixed(2)}</td>
            <td>degrees</td>
            <td />
            <td colSpan="5" />
          </tr>
          <tr>
            <td>Stress Amplitude</td>
            <td>=</td>
            <td>{((model_symbol_table[o.Stress_2].value - model_symbol_table[o.Stress_1].value) / 2.0).toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_1].units}</td>
            <td />
            <td>Stress Ratio</td>
            <td>=</td>
            <td>{(model_symbol_table[o.Stress_1].value / model_symbol_table[o.Stress_2].value).toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.Spring_Index].units}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <b>Cycle Life Details</b>
      <table id="view5" className="report-table">
        <tbody>
          <tr>
            <td colSpan="4" className="text-start">Soderburg calculation inputs:</td>
            <td />
            <td colSpan="4" />
          </tr>
          <tr>
            <td>Stress Mean</td>
            <td>=</td>
            <td>{((model_symbol_table[o.Stress_1].value + model_symbol_table[o.Stress_2].value) / 2.0).toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_1].units}</td>
            <td />
            <td>Stress Range</td>
            <td>=</td>
            <td>{(model_symbol_table[o.Stress_2].value - model_symbol_table[o.Stress_1].value).toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_1].units}</td>
          </tr>
          <tr>
            <td>{model_symbol_table[o.Stress_Lim_Bnd_Stat].name}</td>
            <td>=</td>
            <td>{model_symbol_table[o.Stress_Lim_Bnd_Stat].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_Lim_Bnd_Stat].units}</td>
            <td />
            <td>{model_symbol_table[o.Stress_Lim_Bnd_Endur].name}<sup>*</sup></td>
            <td>=</td>
            <td>{model_symbol_table[o.Stress_Lim_Bnd_Endur].value.toFixed(0)}</td>
            <td className="text-start">{model_symbol_table[o.Stress_Lim_Bnd_Endur].units}</td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>{model_symbol_table[o.Life_Category].name}</td>
            <td>=</td>
            <td colSpan="2" className="text-start">{base.lifeTargValue}</td>
          </tr>
          <tr>
            <td colSpan="4" className="text-start">Soderberg calculation result:</td>
            <td />
            <td><b>{model_symbol_table[o.FS_CycleLife].name}</b></td>
            <td>=</td>
            <td>{model_symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
            <td className="text-start">{model_symbol_table[o.FS_CycleLife].units}</td>
          </tr>
        </tbody>
      </table>
      <br />
      {base.clWarnString === "" ?
        <>
          <table id="view7" className="report-table">
            <tbody>
              <tr>
                <td colSpan="4">Modified Goodman calculation inputs:</td>
                <td />
                <td colSpan="4" />
              </tr>
              <tr>
                <td>{model_symbol_table[o.Material_Type].name}</td>
                <td>=</td>
                <td className="text-start" colSpan="2">{base.matTypeValue}</td>
                <td />
                <td> </td>
                <td> &nbsp; </td>
                <td colSpan="2" className="text-start">{base.peenValue}</td>
              </tr>
              <tr>
                <td>{model_symbol_table[o.Tensile].name}</td>
                <td>=</td>
                <td>{model_symbol_table[o.Tensile].value.toFixed(0)}</td>
                <td className="text-start">{model_symbol_table[o.Tensile].units}</td>
                <td />
                <td>{model_symbol_table[o.PC_Ten_Bnd_Endur].name}<sup>*</sup></td>
                <td>=</td>
                <td>{model_symbol_table[o.PC_Ten_Bnd_Endur].value.toFixed(0)}</td>
                <td className="text-start">{model_symbol_table[o.PC_Ten_Bnd_Endur].units}</td>
              </tr>
              <tr>
                <td>{model_symbol_table[o.Stress_1].name}</td>
                <td>=</td>
                <td>{model_symbol_table[o.Stress_1].value.toFixed(0)}</td>
                <td className="text-start">{model_symbol_table[o.Stress_1].units}</td>
                <td />
                <td>{model_symbol_table[o.Stress_2].name}</td>
                <td>=</td>
                <td>{model_symbol_table[o.Stress_2].value.toFixed(0)}</td>
                <td className="text-start">{model_symbol_table[o.Stress_2].units}</td>
              </tr>
              <tr>
                <td colSpan="4" className="text-start">Modified Goodman calculation result:</td>
                <td />
                <td><b>{model_symbol_table[o.Cycle_Life].name}</b></td>
                <td>=</td>
                <td>{model_symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                <td className="text-start">{model_symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
              </tr>
            </tbody>
          </table>
        </>
        :
        <>{base.clWarnString}</>
      }
      <br />
      <sup>*</sup>Source data for %_Ten_Bnd_Endur (Stress_Lim_Bnd_Endur) based on Stress Ratio = 0.
      <br />
      <br />
    </>
  );
}
