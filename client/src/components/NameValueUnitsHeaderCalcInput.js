import React, { Component } from 'react';
import { OverlayTrigger, Tooltip  } from 'react-bootstrap';
import { connect } from 'react-redux';

class NameValueUnitsHeaderCalcInput extends Component {
    
    render() {
//        console.log('In NameValueUnitsHeaderCalcInput.render this=',this);
        return (
            <>
                { (this.props.symbol_table.reduce((accum,element)=>{if (element.type === "calcinput" && !element.hidden) return accum+1; else return accum;}, 0) > 0) &&
                    (<thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Variables that are not subject to constraints, FIX or Search</Tooltip>}>
                                    <span>Calculation Input</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2" id="CINameTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                                    <span>Name</span>
                                </OverlayTrigger>
                            </th>
                            <th className="text-center" colSpan="2" id="CIValueTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Current values</Tooltip>}>
                                    <span>Value</span>
                                </OverlayTrigger>
                            </th>
                            <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="CIUnitsTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
                                    <span>Units</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>)
                }
            </>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsHeaderCalcInput);
