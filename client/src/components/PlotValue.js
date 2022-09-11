import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import { MIN, MAX, FIXED } from '../store/actionTypes';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, freeSymbolValue } from '../store/actionCreators';
import { pxUpdateObjectiveValue } from '../store/middleware/pxUpdateObjectiveValue';
import { patsh } from './../store/middleware/patsh';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

export class PlotValue extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
//            console.log('In SymbolValue.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            if (this.props.element.format === 'table') {
//                console.log('In SymbolValue.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In SymbolValue.componentDidUpdate table=',table);
                this.setState({
                    table: table,
                });
            }
        }
    }

    render() {
//      console.log('In PlotValue.render this=',this);
      const { store } = this.context;
      var design = JSON.parse(JSON.stringify(store.getState())); // local non-React clone
      const local_store = createStore(reducers, design, applyMiddleware(dispatcher));
//      console.log('store=',store,'design=',design,'local_store=',local_store);
      var local_design = local_store.getState();

      var element = this.props.element;
      const name = element.name;
      var value = element.value;
      var value_log = Math.log10(value);
      var round = Math.round(value_log);
      var pow = Math.pow(1, round);
      const step = pow/10;
      var min_value = value - pow/2;
      var max_value = value + pow/2;
      if (min_value <= 0) {
        min_value = step;
        max_value = value + pow;
      }
//      console.log('In PlotValue.render name=',name,'value=',value);
//      console.log('In PlotValue.render value_log=',value_log,'round=',round,'pow=',pow);
//      console.log('In PlotValue.render min_value=',min_value,'max_value=',max_value,'step=',step);

      local_store.dispatch(fixSymbolValue(name));
      const objmin = local_design.model.system_controls.objmin;
//      console.log('In PlotValue.render objmin=',objmin);
      var xxx = [];
      var yyy = [];
      for (let i = min_value; i < max_value; i += step) {
          local_design = local_store.getState();
          if (element.type === "equationset" && element.input) {
              local_store.dispatch(changeSymbolValue(name, i));
          } else if (element.type === "equationset" && !element.input) {
              local_store.dispatch(changeSymbolConstraint(name, MIN, i));
              local_store.dispatch(changeSymbolConstraint(name, MAX, i));
          }
          // Compress P into PC treating OD_Free as FIXED by skipping it
          var local_element;
          var pc = [];
          for (let i = 0; i < local_design.model.symbol_table.length; i++) {
              local_element = local_design.model.symbol_table[i];
              if (local_element.type === "equationset" && local_element.input) {
                  if (!(local_element.lmin & FIXED)) {
//                      console.log('In search i=',i,'local_element=',local_element);
                      pc.push(local_element.value);
                  }
              }
          }
          // Do the pattern search
          var delarg = local_design.model.system_controls.del;
//          console.log('In PlotValue.render pc=',pc,
//              'delarg=',delarg,
//              'local_design.model.system_controls.delmin=',local_design.model.system_controls.delmin,
//              'objmin=',objmin,
//              'local_design.model.system_controls.maxit=',local_design.model.system_controls.maxit,
//              'local_design.model.system_controls.tol=',local_design.model.system_controls.tol);
          var merit;
          patsh(pc, delarg, local_design.model.system_controls.delmin, objmin, local_design.model.system_controls.maxit, local_design.model.system_controls.tol, local_store, merit);
//          console.log('In PlotValue.render ncode=',ncode);
          // Expand PC back into store change actions treating OD_Free as FIXED by skipping it
          local_design = local_store.getState();
          var kd = 0;
          var p = [];
          var x = [];
          for (let i = 0; i < local_design.model.symbol_table.length; i++) {
              local_element = local_design.model.symbol_table[i];
              if (local_element.type === "equationset" && local_element.input) {
                  if (!(local_element.lmin & FIXED)) {
                      p.push(pc[kd++]);
                  } else {
                      p.push(local_element.value);
                  }
              } else {
                  x.push(local_element.value);
              }
          }
          var obj = pxUpdateObjectiveValue(p, x, local_store);
//          console.log('In PlotValue.render x=',i,'y=',obj);
          xxx.push(i);
          yyy.push(obj);
      }
      local_store.dispatch(freeSymbolValue(name));
//      console.log('In PlotValue.render xxx=',xxx,'yyy=',yyy);
      return (
        <td>
        <Plot
          data={[
            {
              x: xxx,
              y: yyy,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={ {
              shapes: [ {
                  type: 'line',
                  xref: 'x',
                  yref: 'paper',
                  x0: value,
                  y0: 0,
                  x1: value,
                  y1: 1,
                  line: {
                    color: 'rgb(55, 128, 191)',
                    width: 3
                  }
              },
              {
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: 0.0,
                  x1: 1,
                  y1: objmin,
                  fillcolor: '#28a745',
                  opacity: 0.2,
                  line: { width: 0 }
              },
              {
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: objmin,
                  x1: 1,
                  y1: 4*objmin,
                  fillcolor: '#fd7e14',
                  opacity: 0.2,
                  line: { width: 0 }
              },
              {
                  type: 'rect',
                  xref: 'paper',
                  yref: 'y',
                  x0: 0,
                  y0: 4*objmin,
                  x1: 1,
                  y1: Math.max(...yyy),
                  fillcolor: '#dc3545',
                  opacity: 0.2,
                  line: { width: 0 }
              } ],
              width: 135,
              height: 50,
              margin: {t:0, r:0, b:0, l:0},
          } }
        />
        </td>
      );
    }
}

PlotValue.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(PlotValue);
