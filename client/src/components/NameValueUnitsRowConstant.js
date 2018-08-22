import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeConstantValue } from '../store/actionCreators';

class NameValueUnitsRowConstant extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeConstantValue = this.onChangeConstantValue.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            selectedIndex: 6 // Default to Water
        };
    }
    
    onChangeConstantValue(event) {
//        console.log('In NameValueUnitsRowConstant.onChangeConstantValue event.target.value=',event.target.value);
        this.props.changeConstantValue(this.props.constant.name, parseFloat(event.target.value));
    }
    
    onSelect(event) {
//        console.log('In NameValueUnitsRowConstant.onSelect event.target.value=',event.target.value);
        var selectedIndex = event.target.value;
        this.props.constant.value[selectedIndex].forEach((value, index) => {
            if (index > 0) { // Skip the first column
                var name = this.props.constant.value[0][index];
                this.props.changeConstantValue(name,value);
            }
        })
        this.setState({
            selectedIndex: selectedIndex
        })
    }
    
    render() {
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.constant.name}>
                <td className="align-middle" colSpan="2">{this.props.constant.name}</td>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        { typeof this.props.constant.value === 'number' ?
                            <Input className="text-right" type="number" value={this.props.constant.value} onChange={this.onChangeConstantValue} /> : '' }
                        { typeof this.props.constant.value === 'string' ?
                            <Input className="text-right" type="text" value={this.props.constant.value} onChange={this.onChangeConstantValue} /> : '' }
                        { (typeof this.props.constant.value !== 'number' && typeof this.props.constant.value !== 'string') ? // array
                        (
                            <Input type="select" value={this.state.selectedIndex} onChange={this.onSelect}>
                                {this.props.constant.value.map((value, index) =>
                                    index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                )}
                            </Input>
                        ) : '' }
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

const mapDispatchToProps = {
    changeConstantValue: changeConstantValue
};

export default connect(null, mapDispatchToProps)(NameValueUnitsRowConstant);
