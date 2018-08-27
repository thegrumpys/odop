import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../store/actionCreators';

class NameValueUnitsRowCalcInput extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeCalcInputValue = this.onChangeCalcInputValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('this.props.element.name=',this.props.element.name,' this.props.element.type=',this.props.element.type,' this.props.element.table=',this.props.element.table)
        if (this.props.element.type === 'table') {
//            console.log('file = ../designtypes/'+this.props.type+'/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.type+'/'+this.props.element.table+'.json');
//            console.log('table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    onChangeCalcInputValue(event) {
//        console.log('In NameValueUnitsRowCalcInput.onChangeCalcInputValue event.target.value=',event.target.value);
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowCalcInput.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('name=',name,' this.props.symbol_table=',this.props.symbol_table,' check=',this.props.symbol_table.find(element => element.name === name));
                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
                }
            }
        })
    }
    
    render() {
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
                            <Input className="text-right" type="number" value={this.props.element.value} onChange={this.onChangeCalcInputValue} /> : '' }
                        { this.props.element.type === undefined && typeof this.props.element.value === 'string' ?
                            <Input className="text-right" type="text" value={this.props.element.value} onChange={this.onChangeCalcInputValue} /> : '' }
                        { this.props.element.type === 'table' &&
                        (
                            <Input type="select" value={this.props.element.value} onChange={this.onSelect}>
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
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowCalcInput);
