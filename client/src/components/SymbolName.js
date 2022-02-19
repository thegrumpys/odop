import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class SymbolName extends Component {
    
    render() {
//        console.log('In SymbolName.render this=',this);
        return (
            <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')} id={'sn_'+this.props.index}>
                <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                    <span>{this.props.element.name}</span>
                </OverlayTrigger>
            </td>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SymbolName);
