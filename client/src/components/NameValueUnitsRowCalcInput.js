import React, { Component } from 'react';
import { InputGroup, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../store/actionCreators';
import { logValue } from '../logUsage';

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
//        console.log('In NameValueUnitsRowCalcInput.constructor props=',props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
//        console.log('In NameValueUnitsRowCalcInput.constructor this.props.element.name=',this.props.element.name,' this.props.element.format=',this.props.element.format,' this.props.element.table=',this.props.element.table);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In NameValueUnitsRowCalcInput.constructor file= ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In NameValueUnitsRowCalcInput.constructor table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In NameValueUnitsRowCalcInput.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            } else if (this.props.element.format === 'table') {
//                console.log('In NameValueUnitsRowCalcInput.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In NameValueUnitsRowCalcInput.componentDidUpdate table=',table);
                this.setState({
                    table: table
                });
            }
        }
    }

    onChange(event) {
//        console.log('In NameValueUnitsRowCalcInput.onChange event.target.value=',event.target.value);
        this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
        logValue(this.props.element.name,event.target.value);
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
        logValue(this.props.element.name,selectedIndex);
    }
    
    render() {
//        console.log('In NameValueUnitsRowCalcInput.render this=',this);
        // =======================================
        // Table Row
        // =======================================
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2" id={'constant_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                                <Form.Control type="number" disabled={!this.props.element.input} className="text-right" step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                            { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                                <Form.Control type="text" disabled={!this.props.element.input} className="text-right" value={this.props.element.value} onChange={this.onChange} /> : '' }
                            { this.props.element.format === 'table' &&
                            (
                                <Form.Control as="select" disabled={!this.props.element.input} value={this.props.element.value} onChange={this.onSelect}>
                                    {this.state.table.map((value, index) =>
                                        index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                    )}
                                </Form.Control>
                            )
                            }
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    &nbsp;&nbsp;
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </td>
                    <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                </tr>
            </tbody>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(NameValueUnitsRowCalcInput);
