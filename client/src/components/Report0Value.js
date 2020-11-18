import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

class Report0Value extends Component {
    
    constructor(props) {
//        console.log('In Report0Value.constructor props=',props);
        super(props);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In Report0Value.constructor file = ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In Report0Value.constructor table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In Report0Value.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            } else if (this.props.element.format === 'table') {
//                console.log('In Report0Value.componentDidUpdate file = ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In Report0Value.componentDidUpdate table=',table);
                this.setState({
                  table: table
                });
            }
        }
    }

    render() {
//        console.log('In Report0Value.render this.props=', this.props);
        var colSpan;
        if (this.props.colSpan === undefined) {
            colSpan = "1";
        } else {
            colSpan = this.props.colSpan;
        }
        return (
            <React.Fragment>
                <td className="align-middle">
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
                    </InputGroup>
                </td>
            </React.Fragment>
        );
    }
}

export default connect()(Report0Value);
