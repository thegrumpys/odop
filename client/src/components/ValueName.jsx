import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ValueName extends Component {
    
    render() {
//        console.log('In ValueName.render this=',this);
        return (
            <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')} id={'vn_'+this.props.name}>
                <OverlayTrigger placement="top" overlay={this.props.tooltip !== undefined && <Tooltip>{this.props.tooltip}</Tooltip>}>
                    <span>{this.props.name}</span>
                </OverlayTrigger>
            </td>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ValueName);
