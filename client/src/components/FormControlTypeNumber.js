import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class FormControlTypeNumber extends Component {

    constructor(props, context) {
//        console.log('In FormControlTypeNumber.constructor props=',props,'context=',context);
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.state = {
            value: parseFloat(this.props.value),
            valueString: this.props.value, // Update the display
            focused: false,
        };
    }

    onChange(event) {
//        console.log('In FormControlTypeNumber.onChange event.target.value=',event.target.value);
        var value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            this.setState({
                value: value,
                valueString: event.target.value, // Update the display
            });
            this.props.onChangeValid(event); // Pass valid number onward
            this.props.onChange(event); // Pass valid number onward
        } else {
            this.setState({
                valueString: event.target.value, // Update the display
            });
            this.props.onChangeInvalid(event); // Pass invalid number onward
        }
    }

    onFocus(event) {
//        console.log('In FormControlTypeNumber.onFocus event.target.value=',event.target.value);
        this.setState({
            valueString: this.state.value.toString(), // Update the display with unformatted value
            focused: true,
        });
        this.props.onFocus(event);
    }

    onBlur(event) {
//        console.log('In FormControlTypeNumber.onBlur event.target.value=',event.target.value);
        this.setState({
            valueString: this.state.value.toODOPPrecision(), // Update the display with formatted value
            focused: false,
        });
        this.props.onBlur(event);
    }

    onContextMenu(event) {
//        console.log('In FormControlTypeNumber.onContextMenu event.target.value=',event.target.value);
        this.props.onContextMenu(event);
    }

    render() {
//        console.log('In FormControlTypeNumber.render');
        var value_class = this.props.className + ' text-right';
        if (this.state.focused && isNaN(parseFloat(this.state.valueString))) {
            value_class += ' borders-invalid';
        }
        return (<>
            <Form.Control type="number"
                disabled={this.props.disabled}
                className={value_class}
                step="any"
                value={this.state.focused ? this.state.valueString : this.state.value.toODOPPrecision()}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onContextMenu={this.onContextMenu} />
        </>)
    }
}

FormControlTypeNumber.propTypes = {
    onChange: PropTypes.func,
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onContextMenu: PropTypes.func,
}

FormControlTypeNumber.defaultProps = {
    onChange: (()=>{}),
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
    onFocus: (()=>{}),
    onBlur: (()=>{}),
    onContextMenu: (()=>{}),
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FormControlTypeNumber);