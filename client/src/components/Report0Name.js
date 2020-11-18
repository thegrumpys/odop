import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class Report0Name extends Component {
    
    constructor(props) {
//        console.log('In Report0Name.constructor props=',props);
        super(props);
    }
    
    render() {
//        console.log('In Report0Name.render this.props=', this.props);
        return (
            <td className="align-middle" id={'report0name_'+this.props.index}>
                <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                    <span>{this.props.element.name}</span>
                </OverlayTrigger>
            </td>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

export default connect(mapStateToProps)(Report0Name);
