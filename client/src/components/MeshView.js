import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { invokeInit } from '../store/middleware/invokeInit';

export class MeshView extends Component {

    render() {
//      console.log('In MeshView.render this=',this);
      const { store } = this.context;
      var design = JSON.parse(JSON.stringify(store.getState())); // local non-React clone
      const local_store = createStore(reducers, design, applyMiddleware(dispatcher));
      var local_design = local_store.getState();
//      console.log('store=',store,'design=',design,'local_store=',local_store,'local_design=',local_design);

      invokeInit(local_store);
      
      // symbol table index, range min, range max, range increment 
      var plotdata = [
          [1, 0.08, 0.11, 0.003], // Wire_Dia 
          [3, 9, 14, .5], // Coils_T
          [4, 9, 21, 1.6], // Force_1
          [5, 0, 10000, 1000], // Force_2
      ];
      
      var plotvs = [
          [0, 1] // Wire_Dia vs Coils_T
//          [0, 2], // Wire_Dia vs Force_1
//          [0, 3], // Wire_Dia vs Force_2
//          [1, 2], // Coils_T vs Force_1
//          [1, 3], // Coils_T vs Force_2
//          [2, 3], // Force_1 vs Force_2
      ];

      for (let plotnum = 0; plotnum < plotvs.length; plotnum++) {
          var plot = plotvs[plotnum];
          var plotcol1 = plotdata[plot[0]];
          var plotcol2 = plotdata[plot[1]];

//          console.log('plotnum=',plotnum,'plot=',plot,'plotcol1=',plotcol1,'plotcol2=',plotcol2);

          local_design = local_store.getState();
          var element = local_design.model.symbol_table[plotcol1[0]];
          const name = element.name;
//          var value = element.value;
          var min_value = plotcol1[1];
          var max_value = plotcol1[2];
          const step = plotcol1[3];
//          console.log('In MeshView.render name=',name,'value=',value);
//          console.log('In MeshView.render min_value=',min_value,'max_value=',max_value,'step=',step);

          local_design = local_store.getState();
          var element2 = local_design.model.symbol_table[plotcol2[0]];
          const name2 = element2.name;
//          var value2 = element2.value;
          var min_value2 = plotcol2[1];
          var max_value2 = plotcol2[2];
          const step2 = plotcol2[3];
//          console.log('In MeshView.render name2=',name2,'value2=',value2);
//          console.log('In MeshView.render min_value2=',min_value2,'max_value2=',max_value2,'step2=',step2);

          local_store.dispatch(fixSymbolValue(name));
          local_store.dispatch(fixSymbolValue(name2));

          var i = 0; // first row
          var j = 0; // first column
          var zzz = [['MESH']]; // put 'MESH' in first row and column
          for (let y = min_value2; y < max_value2; y += step2) {
              zzz[i][j+1] = y; // y values in first row
              j++; // next column
          }
          j = 0; // reset to first column
          i++; // next row
          for (let x = min_value; x < max_value; x += step) {
              zzz.push([])
              zzz[i][j] = x; // x values in first column
              j++; // next column
              for (let y = min_value2; y < max_value2; y += step2) {
                  local_store.dispatch(changeSymbolValue(name, x));
                  local_store.dispatch(changeSymbolValue(name2, y));
                  local_design = local_store.getState();
                  var z = local_design.model.result.objective_value;
//                  console.log(i,j,x,y,z);
                  zzz[i][j] = z;
                  j++;
              }
              j = 0; // reset to first column
              i++; // next row
          }
//          console.log('In MeshView.render zzz=',JSON.stringify(zzz));

          local_store.dispatch(freeSymbolValue(name));
          local_store.dispatch(freeSymbolValue(name2));

      }

      return (
          <>
              MeshView
              <table>
                  <tbody>
                  {zzz.map((row, rowindex) => 
                      <tr key={rowindex}>
                      {row.map((col, colindex) => 
                          <td key={colindex}>
                              {col}{colindex < row.length-1 ? ',' : ''}
                          </td>)}
                      </tr>
                  )}
                  </tbody>
              </table>
          </>
      );
    }
}

MeshView.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(MeshView);
