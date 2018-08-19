import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeConstantValue } from '../store/actionCreators';

class NameValueUnitsRowConstant extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeConstantValue = this.onChangeConstantValue.bind(this);
    }
    
    onChangeConstantValue(event) {
        this.props.changeConstantValue(this.props.constant.name, parseFloat(event.target.value));
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
                        <Input className="text-right" type="number" value={this.props.constant.value} onChange={this.onChangeConstantValue} />
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
