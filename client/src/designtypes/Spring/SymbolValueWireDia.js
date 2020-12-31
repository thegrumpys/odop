import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED } from '../../store/actionTypes';
import { changeSymbolValue, fixSymbolValue } from '../../store/actionCreators';
import * as mo from './mat_ips_offsets';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};
     
class SymbolValueWireDia extends Component {
    
    constructor(props) {
//        console.log('In SymbolValueWireDia.constructor props=',props);
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }
    
    onSelect(event) {
//        console.log('In SymbolValueWireDia.onSelect event.target.value=',event.target.value);
        var wire_dia = parseFloat(event.target.value);
//        console.log('In SymbolValueWireDia.onSelect wire_dia=',wire_dia);
        this.props.changeSymbolValue(this.props.element.name,wire_dia);
        this.props.fixSymbolValue(this.props.element.name);
    }
  
    render() {
//        console.log('In SymbolValueWireDia.render this=', this);
        
//        console.log('In SymbolValueWireDia.render ../' + this.props.type + '/symbol_table_offsets.js');
        var o = require('../'+this.props.type+'/symbol_table_offsets.js'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render o =', o);

        // Find size name, load size table, and get wire diameter value
//        console.log('In SymbolValueWireDia.render this.props.symbol_table[o.Material_File].value =', this.props.symbol_table[o.Material_File].value);
        if (this.props.symbol_table[o.Material_File].value === "mat_SI.json")
            var m_tab = require('./mat_SI.json');
        else
            var m_tab = require('./mat_ips.json');
//        console.log('In SymbolValueWireDia.render m_tab =', m_tab);
        var i = this.props.symbol_table[o.Material_Type].value;
//        console.log('In SymbolValueWireDia.render i=',i);
        var size_name = m_tab[i][mo.siznam];
//        console.log('In SymbolValueWireDia.render size_name=',size_name);
        var size_table = require('./'+size_name+'.json'); // Dynamically load table
//        console.log('In SymbolValueWireDia.render size_table=',size_table);
        const needle = this.props.element.value;
//        console.log('In SymbolValueWireDia.render needle=',needle);
        var default_value = size_table.find((element,index) => {
            if (index > 0) { // skip the column header
                if (element[0] !== needle) return false; // keep looking
                else return true; // were done
            } else {
                return false; // keep looking
            }
        });
//        console.log('In SymbolValueWireDia.render default_value=',default_value);

        var value_class = 'text-right ';
        var value_tooltip;
        if ((this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) || (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0)) {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-not-feasible";
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-approaching-feasible";
            } else if (this.props.objective_value > 0.0) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-feasible";
            } else {
                value_class += "text-strictly-feasible";
            }
        }
        return (
            <React.Fragment>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        {(value_tooltip != undefined ?
                            <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={default_value === undefined ? this.props.element.value : default_value[0]} onChange={this.onSelect}>
                                    {default_value === undefined && <option key={0} value={this.props.element.value}>{this.props.element.value+" Non-std"}</option>}
                                    {size_table.map((value, index) => index > 0 ? <option key={index} value={value[0]}>{value[0]}</option> : '')}
                                </Form.Control>
                            </OverlayTrigger>
                        :
                            <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={default_value === undefined ? this.props.element.value : default_value[0]} onChange={this.onSelect}>
                            {default_value === undefined && <option key={0} value={this.props.element.value}>{this.props.element.value+" Non-std"}</option>}
                                {size_table.map((value, index) => index > 0 ? <option key={index} value={value[0]}>{value[0]}</option> : '')}
                            </Form.Control>
                        )}
                    </InputGroup>
                </td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    fixSymbolValue: fixSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValueWireDia);
