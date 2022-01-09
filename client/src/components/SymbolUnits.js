import React, { Component } from 'react';
import { connect } from 'react-redux';

class SymbolUnits extends Component {
    
    render() {
//        console.log('In SymbolUnits.render this=',this);
        return (
            <>
                <td className={"text-nowrap align-middle " + (this.props.system_controls.show_units ? "" : "d-none") + (this.props.className !== undefined ? this.props.className : '')}>{this.props.element.units}</td>
            </>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(SymbolUnits);
