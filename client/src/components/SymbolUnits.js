import React, { Component } from 'react';
import { connect } from 'react-redux';

class SymbolUnits extends Component {
    
    constructor(props) {
//        console.log('In SymbolUnits.constructor props=',props);
        super(props);
    }
    
    render() {
//        console.log('In SymbolUnits.render this=', this);
        var colSpan;
        if (this.props.colSpan === undefined) {
            colSpan = "1";
        } else {
            colSpan = this.props.colSpan;
        }
        return (
            <React.Fragment>
                <td className={"text-nowrap align-middle " + (this.props.system_controls.show_units ? "" : "d-none") + this.props.className}>{this.props.element.units}</td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(SymbolUnits);
