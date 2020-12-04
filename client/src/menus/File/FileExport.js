import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class FileExport extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.onExport = this.onExport.bind(this);
    }
    
    onExport() {
//        console.log('In FileExport.onExport this.props.type=',this.props.type,' this.props.name=',this.props.name);
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(this.props.state, null, 2)]));
//        console.log('In FileExport.exportDesign url=', url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.props.name + '.json');
//        console.log('In FileExport.exportDesign link=', link);
        document.body.appendChild(link);
        link.click();
        logUsage('event', 'FileExport', { 'event_label': this.props.type + ' ' + this.props.name });
    }

    render() {
//        console.log('In FileExport.render this=', this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.onExport}>
                    Export
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.model.type,
    state: state.model
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileExport);

