import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { changeConstantValue } from '../store/actionCreators';

class NameValueUnitsRowConstant extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeConstantValue = this.onChangeConstantValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('this.props.constant.name=',this.props.constant.name,' this.props.constant.type=',this.props.constant.type,' this.props.constant.table=',this.props.constant.table)
        if (this.props.constant.type === 'table') {
//            console.log('file = ../designtypes/'+this.props.type+'/'+this.props.constant.table+'.json');
            var table = require('../designtypes/'+this.props.type+'/'+this.props.constant.table+'.json');
//            console.log('table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    onChangeConstantValue(event) {
//        console.log('In NameValueUnitsRowConstant.onChangeConstantValue event.target.value=',event.target.value);
        this.props.changeConstantValue(this.props.constant.name, parseFloat(event.target.value));
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowConstant.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeConstantValue(this.props.constant.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('name=',name,' this.props.constants=',this.props.constants,' check=',this.props.constants.find(entry => entry.name === name));
                if (this.props.constants.find(entry => entry.name === name) !== undefined) {
                    this.props.changeConstantValue(name,value);
                }
            }
        })
    }
    
    render() {
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.constant.name}>
                <td className="align-middle" colSpan="2" id={'constant_'+this.props.index}>{this.props.constant.name}</td>
                { this.props.constant.tooltip !== undefined && <UncontrolledTooltip placement="left" target={'constant_'+this.props.index}>{this.props.constant.tooltip}</UncontrolledTooltip>}
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        { this.props.constant.type === undefined && typeof this.props.constant.value === 'number' ?
                            <Input className="text-right" type="number" value={this.props.constant.value} onChange={this.onChangeConstantValue} /> : '' }
                        { this.props.constant.type === undefined && typeof this.props.constant.value === 'string' ?
                            <Input className="text-right" type="text" value={this.props.constant.value} onChange={this.onChangeConstantValue} /> : '' }
                        { this.props.constant.type === 'table' &&
                        (
                            <Input type="select" value={this.props.constant.value} onChange={this.onSelect}>
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
                <td className="text-nowrap align-middle" colSpan="1">{this.props.constant.units}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    type: state.type,
    constants: state.constants
});

const mapDispatchToProps = {
    changeConstantValue: changeConstantValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowConstant);
