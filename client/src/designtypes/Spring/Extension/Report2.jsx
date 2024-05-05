import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportBaseContext from './ReportBaseContext';
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';

export default function Report2() {
//  console.log('Report2 - Mounting...');
  const symbol_table = useSelector((state) => state.modelSlice.model.symbol_table);
  const base = useContext(ReportBaseContext);
//  console.log('Report2','base=',base);

  const onClick = (event) => {
//    console.log("In Report2.onClick event=",event);
    window.print();
    return false;
  }

  return (
    <>
      <h4 className="d-flex mt-3">
        <span className="me-auto">ODOP:Spring &nbsp; Extension Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
        <Button onClick={onClick}>Print</Button>
      </h4>
      <br />
      <table id="view1" className="report-table">
        <tbody>
          <tr>
            <td>{symbol_table[o.Spring_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{symbol_table[o.Spring_Type].value}</td>
            <td />
            <td>{symbol_table[o.Material_Type].name}</td>
            <td>=</td>
            <td className="text-start" colSpan="2">{base.matTypeValue}</td>
          </tr>
          <tr>
            <td>{symbol_table[o.Wire_Dia].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Wire_Dia].value.toFixed(4)}</td>
            <td className="text-start">{symbol_table[o.Wire_Dia].units}</td>
            <td />
            <td>{symbol_table[o.Torsion_Modulus].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Torsion_Modulus].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Torsion_Modulus].units}</td>
          </tr>
          <tr>
            <td>{symbol_table[o.Spring_Index].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Spring_Index].value.toFixed(3)}</td>
            <td className="text-start">{symbol_table[o.Spring_Index].units}</td>
            <td />
            <td>{symbol_table[o.Tensile].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Tensile].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Tensile].units}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table id="view2" className="report-table">
        <thead>
          <tr>
            <th colSpan="5"></th>
            <th colSpan="3" className="text-center"> ----- kw1 = {base.kw1.toFixed(3)} -----</th>
          </tr>
          <tr>
            <td></td>
            <td className="text-center"><b>Force</b><br />{symbol_table[o.Force_1].units}</td>
            <td className="text-center"><b>Deflect</b><br />{symbol_table[o.L_Free].units}</td>
            <td className="text-center"><b>Length</b><br />{symbol_table[o.L_Free].units}</td>
            <td />
            <td className="text-center"><b>Stress</b><br />{symbol_table[o.Stress_1].units}</td>
            <td className="text-center"><b>%TS</b><br />%</td>
            <td className="text-center"><b>Static&nbsp;FS</b><br />{symbol_table[o.FS_2].units}</td>
            <td />
            <td className="text-center"><b>Energy</b><br />{symbol_table[o.Energy].units}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Initial</b></td>
            <td>{symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
            <td>{(0.0).toFixed(4)}</td>
            <td>{symbol_table[o.L_Free].value.toFixed(3)}</td>
            <td />
            <td>{symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
            <td>{(symbol_table[o.Stress_Initial].value / base.dhat).toFixed(1)}</td>
            <td>{(symbol_table[o.Stress_Lim_Stat].value / symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
            <td />
            <td>{(0.0).toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>1</b></td>
            <td>{symbol_table[o.Force_1].value.toFixed(2)}</td>
            <td>{symbol_table[o.Deflect_1].value.toFixed(4)}</td>
            <td>{symbol_table[o.L_1].value.toFixed(3)}</td>
            <td />
            <td>{symbol_table[o.Stress_1].value.toFixed(0)}</td>
            <td>{(symbol_table[o.Stress_1].value / base.dhat).toFixed(1)}</td>
            <td>{base.fs_1.toFixed(2)}</td>
            <td />
            <td>{base.energy_1.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>2</b></td>
            <td>{symbol_table[o.Force_2].value.toFixed(2)}</td>
            <td>{symbol_table[o.Deflect_2].value.toFixed(4)}</td>
            <td>{symbol_table[o.L_2].value.toFixed(3)}</td>
            <td />
            <td>{symbol_table[o.Stress_2].value.toFixed(0)}</td>
            <td>{(symbol_table[o.Stress_2].value / base.dhat).toFixed(1)}</td>
            <td>{symbol_table[o.FS_2].value.toFixed(2)}</td>
            <td />
            <td>{base.energy_2.toFixed(2)}</td>
          </tr>
          <tr>
            <td><b>MaxSafe</b></td>
            <td>{base.safe_load.toFixed(2)}</td>
            <td>{base.safe_travel.toFixed(4)}</td>
            <td>{(symbol_table[o.L_Free].value + base.safe_travel).toFixed(3)}</td>
            <td />
            <td>{symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
            <td>{(symbol_table[o.Stress_Lim_Stat].value / base.dhat).toFixed(1)}</td>
            <td>{(1.0).toFixed(2)}</td>
            <td />
            <td>{base.energy_MS.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <br />
      Calculations assume: {base.peenValue}
      <hr />
      <b>Stress Details</b>
      <table id="view4" className="report-table">
        <tbody>
          <tr>
            <td>{symbol_table[o.Stress_Init_Lo].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Init_Lo].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Init_Lo].units}</td>
            <td />
            <td>{symbol_table[o.Stress_Init_Hi].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Init_Hi].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Init_Hi].units}</td>
          </tr>
          <tr>
            <td>Stress Amplitude</td>
            <td>=</td>
            <td>{((symbol_table[o.Stress_2].value - symbol_table[o.Stress_1].value) / 2.0).toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_1].units}</td>
            <td />
            <td>Stress Ratio</td>
            <td>=</td>
            <td>{(symbol_table[o.Stress_1].value / symbol_table[o.Stress_2].value).toFixed(3)}</td>
            <td className="text-start">{symbol_table[o.Spring_Index].units}</td>
          </tr>
          <tr>
            <td>{symbol_table[o.Stress_Lim_Endur].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Lim_Endur].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Lim_Endur].units}</td>
            <td />
            <td>{symbol_table[o.Stress_Lim_Stat].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Lim_Stat].units}</td>
          </tr>
          <tr>
            <td>{symbol_table[o.Stress_Lim_Bend].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Lim_Bend].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Lim_Bend].units}</td>
            <td />
          </tr>
          <tr>
            <td>Bending Str @End (Sa)</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Hook].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Hook].units}</td>
            <td>&nbsp;&nbsp;</td>
            <td>Torsion Str @End (Sb)</td>
            <td>=</td>
            <td>{base.sb.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Hook].units}</td>
          </tr>
          <tr>
            <td className="text-end" colSpan="9">(Torsion value assumes a vertical bend radius (R2) equal twice wire diameter.)</td>
          </tr>
          <tr>
            <td>{symbol_table[o.FS_Hook].name}</td>
            <td>=</td>
            <td>{symbol_table[o.FS_Hook].value.toFixed(2)}</td>
            <td className="text-start">{symbol_table[o.FS_Hook].units}</td>
            <td />
          </tr>
        </tbody>
      </table>
      <br />
      <b>Cycle Life Details</b>
      {base.warnmsg !== "" && <br />}{base.warnmsg}{base.warnmsg !== "" && <br />}{base.warnmsg !== "" && <br />}
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
            <td>{((symbol_table[o.Stress_1].value + symbol_table[o.Stress_2].value) / 2.0).toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_1].units}</td>
            <td />
            <td>Stress Range</td>
            <td>=</td>
            <td>{(symbol_table[o.Stress_2].value - symbol_table[o.Stress_1].value).toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_1].units}</td>
          </tr>
          <tr>
            <td>{symbol_table[o.Stress_Lim_Stat].name}</td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Lim_Stat].units}</td>
            <td />
            <td>{symbol_table[o.Stress_Lim_Endur].name}<sup>*</sup></td>
            <td>=</td>
            <td>{symbol_table[o.Stress_Lim_Endur].value.toFixed(0)}</td>
            <td className="text-start">{symbol_table[o.Stress_Lim_Endur].units}</td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>{symbol_table[o.Life_Category].name}</td>
            <td>=</td>
            <td colSpan="2" className="text-start">{base.lifeTargValue}</td>
          </tr>
          <tr>
            <td colSpan="4" className="text-start">Soderberg calculation result:</td>
            <td />
            <td><b>{symbol_table[o.FS_CycleLife].name}</b></td>
            <td>=</td>
            <td>{symbol_table[o.FS_CycleLife].value.toFixed(3)}</td>
            <td className="text-start">{symbol_table[o.FS_CycleLife].units}</td>
          </tr>
        </tbody>
      </table>
      <br />
      {base.clWarnString === "" ?
        <>
          <table id="view6" className="report-table">
            <tbody>
              <tr>
                <td colSpan="4">Modified Goodman calculation inputs:</td>
                <td />
                <td colSpan="4" />
              </tr>
              <tr>
                <td>{symbol_table[o.Material_Type].name}</td>
                <td>=</td>
                <td className="text-start" colSpan="2">{base.matTypeValue}</td>
                <td />
                <td> </td>
                <td> &nbsp; </td>
                <td colSpan="2" className="text-start">{base.peenValue}</td>
              </tr>
              <tr>
                <td>{symbol_table[o.Tensile].name}</td>
                <td>=</td>
                <td>{symbol_table[o.Tensile].value.toFixed(0)}</td>
                <td className="text-start">{symbol_table[o.Tensile].units}</td>
                <td />
                <td>{symbol_table[o.PC_Tensile_Endur].name}<sup>*</sup></td>
                <td>=</td>
                <td>{symbol_table[o.PC_Tensile_Endur].value.toFixed(0)}</td>
                <td className="text-start">{symbol_table[o.PC_Tensile_Endur].units}</td>
              </tr>
              <tr>
                <td>{symbol_table[o.Stress_1].name}</td>
                <td>=</td>
                <td>{symbol_table[o.Stress_1].value.toFixed(0)}</td>
                <td className="text-start">{symbol_table[o.Stress_1].units}</td>
                <td />
                <td>{symbol_table[o.Stress_2].name}</td>
                <td>=</td>
                <td>{symbol_table[o.Stress_2].value.toFixed(0)}</td>
                <td className="text-start">{symbol_table[o.Stress_2].units}</td>
              </tr>
              <tr>
                <td colSpan="4" className="text-start">Modified Goodman calculation result:</td>
                <td />
                <td><b>{symbol_table[o.Cycle_Life].name}</b></td>
                <td>=</td>
                <td>{symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                <td className="text-start">{symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
              </tr>
              <tr>
                <td colSpan="5"></td>
                <td>({symbol_table[o.Cycle_Life].name}</td>
                <td className="text-start" colSpan="3">&nbsp; applies to body coils only.)</td>
              </tr>
            </tbody>
          </table>
        </>
        :
        <>{base.clWarnString}</>
      }
      <br />
      <sup>*</sup>Source data for %_Tensile_Endur (Stress_Lim_Endur) based on Stress Ratio = 0.
      <br />
      <br />
    </>
  );
}
