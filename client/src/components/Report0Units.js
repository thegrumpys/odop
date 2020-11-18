import React, { Component } from 'react';
import { connect } from 'react-redux';

class Report0Units extends Component {
    
    constructor(props) {
//        console.log('In Report0Units.constructor props=',props);
        super(props);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                focused: false
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In Report0Units.constructor file = ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In Report0Units.constructor table=',table);
            this.state = {
                table: table
            };
        }
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In Report0Units.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            } else if (this.props.element.format === 'table') {
//                console.log('In Report0Units.componentDidUpdate file = ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In Report0Units.componentDidUpdate table=',table);
                this.setState({
                  table: table
                });
            }
        }
    }

    render() {
//        console.log('In Report0Units.render this.props=', this.props);
        var colSpan;
        if (this.props.colSpan === undefined) {
            colSpan = "1";
        } else {
            colSpan = this.props.colSpan;
        }
        return (
            <React.Fragment>
                <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")}>{this.props.element.units}</td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
});

export default connect(mapStateToProps)(Report0Units);
