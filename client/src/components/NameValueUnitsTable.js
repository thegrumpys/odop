import React, { Component } from 'react';
import { Table, UncontrolledTooltip  } from 'react-bootstrap';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';
import { connect } from 'react-redux';

export class NameValueUnitsTable extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">Independent Variables</th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2" id="NameTitle">Name</th>
                            <th className="text-center" colSpan="2" id="ValueTitle">Value (Fix)</th>
                            <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="UnitsTitle">Units</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.input && element.equationset && !element.hidden && <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">Dependent Variables</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.input && element.equationset && !element.hidden && <NameValueUnitsRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        { (this.props.symbol_table.reduce((accum,element)=>{if (!element.equationset && !element.hidden) return accum+1; else return accum;}, 0) > 0) &&
                            (<tr>
                                <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">Calculation Inputs</th>
                                <UncontrolledTooltip placement="top" target="CITitle">Variables that are not subject to constraints, FIX or Search</UncontrolledTooltip>
                            </tr>)
                        }
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.equationset && !element.hidden && <NameValueUnitsRowCalcInput key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVTitle">Inputs to design equations</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="NameTitle">Variable names</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="ValueTitle">Current values <br /> (Check box at right to FIX)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="UnitsTitle">Units (information only)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVTitle">Outputs from design equations</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsTable);
