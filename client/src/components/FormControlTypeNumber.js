import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class FormControlTypeNumber extends Component {

    constructor(propsm, context) {
        console.log('In FormControlTypeNumber.constructor props=',props,'context=',context');
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            valueString: this.props.value.toODOPPrecision(), // Update the display
            focused: false,
        }
    }
    
    onChange(event) {
        console.log('In FormControlTypeNumber.onChange event=',event);
        this.setState({
            valueString: event.target.value, // Update the display
        });
        var value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            this.props.onChange(event); // Pass valid number onward
        }
    }
    
    onFocus(event) {
        console.log('In FormControlTypeNumber.onFocus event=',event);
        this.setState({
            valueString: this.props.value.toString(), // Update the display with unformatted value
            focused: true,
        });
        this.props.onFocus(event);
    }
    
    onBlur(event) {
        console.log('In FormControlTypeNumber.onBlur event=',event);
        this.setState({
            valueString: this.props.value.toODOPPrecision(), // Update the display with formatted value
            focused: false,
        });
        this.props.onBlur(event);
    }

    render() {
        console.log('In FormControlTypeNumber.render');
        var value_class = 'text-right ';
        if (this.state.focused && isNaN(parseFloat(this.state.valueString))) {
            value_class += "borders-invalid ";
        }
        return
            <Form.Control 
                type="number"
                disabled={!this.props.disabled}
                className={value_class}
                value={this.state.focused ? this.state.valueString : this.props.value.toODOPPrecision()}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur} />
    }

ConstraintMaxRowIndependentVariable.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

ConstraintMaxRowIndependentVariable.defaultProps = {
    onChange: (()=>{}),
    onFocus: (()=>{}),
    onBlur: (()=>{}),
}

}