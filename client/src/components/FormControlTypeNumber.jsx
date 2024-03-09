import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toODOPPrecision } from '../toODOPPrecision'

class FormControlTypeNumber extends Component {

    constructor(props, context) {
//        console.log('In FormControlTypeNumber.constructor props=',props,'context=',context);
        super(props, context);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        if (Number.isFinite(this.props.value)) {
            var value = parseFloat(this.props.value);
            this.state = {
                value: value,
                valueString: value.toString(), // Update the display
                isInvalid: false,
                focused: false,
            };
        } else {
            this.state = {
                value: this.props.value,
                valueString: this.props.value.toString(), // Update the display
                isInvalid: true,
                focused: false,
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (Number.isFinite(this.props.value)) {
            if (prevProps.value !== this.props.value) {
//                console.log('In FormControlTypeNumber.componentDidUpdate prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
                if (this.props.value !== this.state.value) { // Only update our internal state value if they differ leaving the valueString unchanged.
//                    console.log('In FormControlTypeNumber.componentDidUpdate 0 prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
                    var value = parseFloat(this.props.value);
                    this.setState({
                        value: value,
                        valueString: value.toString(), // Update the display
                    });
                }
            }
        } else {
            if (Number.isNaN(this.props.value) && this.state.valueString !== 'NaN') {
//                console.log('In FormControlTypeNumber.componentDidUpdate 1 prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
                this.setState({
                    value: this.props.value,
                    valueString: this.props.value.toString(), // Update the display
                    isInvalid: true,
                });
            } else if (this.props.value === Number.POSITIVE_INFINITY && this.state.valueString !== 'Infinity') {
//                console.log('In FormControlTypeNumber.componentDidUpdate 2 prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
                this.setState({
                    value: this.props.value,
                    valueString: this.props.value.toString(), // Update the display
                    isInvalid: true,
                });
            } else if (this.props.value === Number.NEGATIVE_INFINITY && this.state.valueString !== '-Infinity') {
//                console.log('In FormControlTypeNumber.componentDidUpdate 3 prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
                this.setState({
                    value: this.props.value,
                    valueString: this.props.value.toString(), // Update the display
                    isInvalid: true,
                });
            }
        }
    }

    onClick(event) {
//        console.log('In FormControlTypeNumber.onClick event.target.value=',event.target.value,'state=',this.state);
        this.props.onClick(event); // Pass valid number onward
    }

    onChange(event) {
//        console.log('In FormControlTypeNumber.onChange event.target.value=',event.target.value,'state=',this.state);
        var value = parseFloat(event.target.value);
        if (Number.isFinite(value)) {
//            console.log('In FormControlTypeNumber.onChange Valid event.target.value=',event.target.value,'state=',this.state);
            this.setState({
                value: value,
                valueString: event.target.value, // Update the display
                isInvalid: false,
            });
            this.props.onChangeValid(event); // Pass valid number onward
            this.props.onChange(event); // Pass valid number onward
        } else {
//            console.log('In FormControlTypeNumber.onChange Invalid event.target.value=',event.target.value,'state=',this.state);
            this.setState({
                valueString: event.target.value, // Update the display
                isInvalid: true,
            });
            this.props.onChangeInvalid(event); // Pass invalid number onward
        }
    }

    onFocus(event) {
        if (!this.props.readOnly) {
            if (Number.isFinite(this.state.value)) {
//                console.log('In FormControlTypeNumber.onFocus 1 event.target.value=',event.target.value,'state=',this.state);
                this.setState({
                    focused: true,
                    valueString: this.state.value.toString(), // Update the display with unformatted value
                });
            } else {
//                console.log('In FormControlTypeNumber.onFocus 2 event.target.value=',event.target.value,'state=',this.state);
                this.setState({
                    focused: true,
                    valueString: '', // Update the display with unformatted value
                    isInvalid: true,
                });
            }
        }
        this.props.onFocus(event);
    }

    onBlur(event) {
//        console.log('In FormControlTypeNumber.onBlur event.target.value=',event.target.value,'state=',this.state);
        if (this.state.isInvalid) {
            event.target.value = this.state.value.toString();
            this.props.onChangeValid(event); // Pass valid number onward
            this.props.onChange(event); // Pass valid number onward
        }
        this.setState({
            valueString: toODOPPrecision(this.state.value), // Update the display with formatted value
            isInvalid: false,
            focused: false,
        });
        this.props.onBlur(event);
    }

    onContextMenu(event) {
//        console.log('In FormControlTypeNumber.onContextMenu event.target.value=',event.target.value);
        this.props.onContextMenu(event);
    }

    render() {
//        console.log('In FormControlTypeNumber.render value=',this.state.value,'valueString=',this.state.valueString);
//        console.log('In FormControlTypeNumber.render className=',this.props.className);
        var className = (this.props.className !== undefined ? this.props.className : '') + ' text-right';
        if (!Number.isFinite(parseFloat(this.state.valueString))) {
            className += ' text-not-feasible';
            if (this.state.focused) {
                className += ' borders-invalid';
            }
        }
        var icon_alerts = this.props.icon_alerts; // start with the icon alerts
        if (icon_alerts === undefined) {
          icon_alerts = [];
        }
//        console.log('In FormControlTypeNumber.render icon_alerts=',icon_alerts);
        var icon_tooltip;
        if (icon_alerts.length > 0) {
            icon_tooltip =
                <>
                    <b>Alerts</b>
                    <ul>
                        {icon_alerts.map((entry, i) => { return <li className={entry.className} key={i}>{entry.severity}: {entry.message}</li>})}
                    </ul>
                </>;
//            console.log('icon_tooltip=',icon_tooltip);
        }

        var p = Object.assign({},this.props); // clone the props
        delete p.onChangeValid; // remove special on functions
        delete p.onChangeInvalid;
        delete p.disabledText;
        delete p.icon_alerts;
        delete p.validmin;
        delete p.validmax;

        var icon_class = "fas fa-exclamation-triangle icon-invalid ";
        return (<>
            {icon_alerts.length > 0 ?
                <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{icon_tooltip}</Tooltip>}>
                    <i className={icon_class}></i>
                </OverlayTrigger>
            :
            ''}
            <Form.Control type={Number.isFinite(this.state.value) ? 'number' : ''}
                {...p} // Allow OverlayTrigger to pass-in other props
                onClick={this.onClick}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                className={className}
                value={this.props.disabledText ? '' : this.state.focused ? this.state.valueString : (Number.isFinite(this.state.value) ? toODOPPrecision(this.state.value) : this.state.valueString)} />
        </>)
    }
}

FormControlTypeNumber.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledText: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.number,
    validmin: PropTypes.number,
    validmax: PropTypes.number,
    step: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

FormControlTypeNumber.defaultProps = {
    className: '',
    disabled: false,
    disabledText: false,
    readOnly: false,
    value: '',
    validmin: -Number.MAX_VALUE,
    validmax: Number.MAX_VALUE,
    step: 'any',
    onClick: (()=>{}),
    onChange: (()=>{}),
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
    onFocus: (()=>{}),
    onBlur: (()=>{}),
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FormControlTypeNumber);