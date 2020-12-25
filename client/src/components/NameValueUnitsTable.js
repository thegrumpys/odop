import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';
import { connect } from 'react-redux';

class NameValueUnitsTable extends Component {
    
    render() {
//        console.log('In NameValueUnitsTable.render this=',this);
        return (
            <React.Fragment>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Inputs to design equations</Tooltip>}>
                                    <span>Independent Variables</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2" id="NameTitle">
                            <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                                <span>Name</span>
                            </OverlayTrigger>
                            </th>
                            <th className="text-center" colSpan="2" id="ValueTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Current values.<br />(Checkbox at right to FIX. Unchecked to FREE)</Tooltip>}>
                                    <span>Value (&nbsp;<i className="far fa-check-square"></i>&nbsp;Fix&nbsp;-&nbsp;<i className="far fa-square"></i>&nbsp;Free&nbsp;)</span>
                                </OverlayTrigger>
                            </th>
                            <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="UnitsTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
                                    <span>Units</span>
                                </OverlayTrigger>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && element.input && !element.hidden && <NameValueUnitsRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Outputs from design equations</Tooltip>}>
                                    <span>Dependent Variables</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "equationset" && !element.input && !element.hidden && <NameValueUnitsRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        { (this.props.symbol_table.reduce((accum,element)=>{if (element.type === "calcinput" && !element.hidden) return accum+1; else return accum;}, 0) > 0) &&
                            (<tr>
                                <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Variables that are not subject to constraints, FIX or Search</Tooltip>}>
                                        <span>Calculation Inputs</span>
                                    </OverlayTrigger>
                                </th>
                            </tr>)
                        }
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.type === "calcinput" && !element.hidden && <NameValueUnitsRowCalcInput key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsTable);
