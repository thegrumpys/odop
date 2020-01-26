import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue, changeSymbolInput } from '../store/actionCreators';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class NameValueUnitsRowCalcInput extends Component {
    
    constructor(props) {
//        console.log('In NameValueUnitsRowCalcInput.constructor');
        super(props);
        this.initializeInputFlags = this.initializeInputFlags.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('In NameValueUnitsRowCalcInput.constructor this.props.element.name=',this.props.element.name,' this.props.element.type=',this.props.element.type,' this.props.element.table=',this.props.element.table);
        if (this.props.element.type === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.type === 'table') {
//            console.log('In NameValueUnitsRowCalcInput.constructor file = ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In NameValueUnitsRowCalcInput.constructor table=',table);
            this.state = {
                table: table
            };
        }
        this.initializeInputFlags(this.props.element.name,this.props.element.value);
    }
    
    initializeInputFlags(name,value) {
//        console.log('In NameValueUnitsRowCalcInput.initializeInputFlags','name=',name,'value=',value);
        
        if (this.props.type === "Spring/Compression" && name === "Spring_Type") {
            this.props.changeSymbolInput("Spring_Type", true);
        } else if (this.props.type === "Spring/Expansion" && name === "Spring_Type") {
            this.props.changeSymbolInput("Spring_Type", true);
        } else if (this.props.type === "Spring/Torsion" && name === "Spring_Type") {
            this.props.changeSymbolInput("Spring_Type", true);
        }

        if (this.props.type === "Spring/Compression" && name === "Prop_Calc_Method") {
            switch(value){
                default:
                case 1: // Prop_Calc_Method = 1 - Use values from material table
                    this.props.changeSymbolInput("ASTM/Fed_Spec", true);
                    this.props.changeSymbolInput("Process", true);
                    this.props.changeSymbolInput("Density", true);
                    this.props.changeSymbolInput("Torsion_Modulus", true);
                    this.props.changeSymbolInput("Hot_Factor_Kh", true);
                    this.props.changeSymbolInput("Tensile", true);
                    this.props.changeSymbolInput("%_Tensile_Stat", true);
                    this.props.changeSymbolInput("%_Tensile_Endur", true);
                    this.props.changeSymbolInput("Stress_Lim_Stat", true);
                    this.props.changeSymbolInput("Stress_Lim_Endur", true);
                    break;
                case 2: // Prop_Calc_Method = 2 - Specify Tensile, %_Tensile_Stat & %_Tensile_Endur
                    this.props.changeSymbolInput("ASTM/Fed_Spec", true);
                    this.props.changeSymbolInput("Process", true);
                    this.props.changeSymbolInput("Density", false);
                    this.props.changeSymbolInput("Torsion_Modulus", false);
                    this.props.changeSymbolInput("Hot_Factor_Kh", false);
                    this.props.changeSymbolInput("Tensile", false);
                    this.props.changeSymbolInput("%_Tensile_Endur", false);
                    this.props.changeSymbolInput("%_Tensile_Stat", false);
                    this.props.changeSymbolInput("Stress_Lim_Stat", true);
                    this.props.changeSymbolInput("Stress_Lim_Endur", true);
                    break;
                case 3: // Prop_Calc_Method = 3 - Specify Stress_Lim_Stat & Stress_Lim_Endur
                    this.props.changeSymbolInput("ASTM/Fed_Spec", true);
                    this.props.changeSymbolInput("Process", true);
                    this.props.changeSymbolInput("Density", false);
                    this.props.changeSymbolInput("Torsion_Modulus", false);
                    this.props.changeSymbolInput("Hot_Factor_Kh", false);
                    this.props.changeSymbolInput("Tensile", false);
                    this.props.changeSymbolInput("%_Tensile_Endur", true);
                    this.props.changeSymbolInput("%_Tensile_Stat", true);
                    this.props.changeSymbolInput("Stress_Lim_Stat", false);
                    this.props.changeSymbolInput("Stress_Lim_Endur", false);
                    break;
            }
        } else if (this.props.type === "Spring/Extension" && name === "Prop_Calc_Method") {
            console.log("TBD");
        } else if (this.props.type === "Spring/Torsion" && name === "Prop_Calc_Method") {
            console.log("TBD");
        }

        if (this.props.type === "Spring/Compression" && name === "End_Type") {
            if (value === 7) {
                this.props.changeSymbolInput("Inactive_Coils", false);
                this.props.changeSymbolInput("Add_Coils@Solid", false);
            } else {
                this.props.changeSymbolInput("Inactive_Coils", true);
                this.props.changeSymbolInput("Add_Coils@Solid", true);
            }
        } else if (this.props.type === "Spring/Expansion" && name === "End_Type") {
            console.log("TBD");
        } else if (this.props.type === "Spring/Torsion" && name === "End_Type") {
            console.log("TBD");
        }
    }
    
    onChange(event) {
//        console.log('In NameValueUnitsRowCalcInput.onChange event.target.value=',event.target.value);
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
        this.initializeInputFlags(this.props.element.name, parseFloat(event.target.value));
    }
    
    onFocus(event) {
//        console.log("In NameValueUnitsRowCalcInput.onFocus event.target.value=", event.target.value);
        this.setState({
            focused: true
        });
    }
    
    onBlur(event) {
//        console.log("In NameValueUnitsRowCalcInput.onBlur event.target.value=", event.target.value);
        this.setState({
            focused: false
        });
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowCalcInput.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        this.initializeInputFlags(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('In NameValueUnitsRowCalcInput.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table,' check=',this.props.symbol_table.find(element => element.name === name));
                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
                    this.initializeInputFlags(name,value);
                }
            }
        });
    }
    
    render() {
//        console.log('In NameValueUnitsRowCalcInput.render');
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.element.name}>
                <td className="align-middle" colSpan="2" id={'constant_'+this.props.index}>{this.props.element.name}</td>
                { this.props.element.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'constant_'+this.props.index}>{this.props.element.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        { this.props.element.type === undefined && typeof this.props.element.value === 'number' ?
                            <Input disabled={this.props.element.input} className="text-right" type="number" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                        { this.props.element.type === undefined && typeof this.props.element.value === 'string' ?
                            <Input disabled={this.props.element.input} className="text-right" type="text" value={this.props.element.value} onChange={this.onChange} /> : '' }
                        { this.props.element.type === 'table' &&
                        (
                            <Input disabled={this.props.element.input} type="select" value={this.props.element.value} onChange={this.onSelect}>
                                {this.state.table.map((value, index) =>
                                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                )}
                            </Input>
                        )
                        }
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                &nbsp;&nbsp;
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </td>
                <td className="text-nowrap align-middle" colSpan="1">{this.props.element.units}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table
});

const mapDispatchToProps = {
        changeSymbolValue: changeSymbolValue,
        changeSymbolInput: changeSymbolInput
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowCalcInput);
