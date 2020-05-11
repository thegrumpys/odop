import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { withAuth } from '@okta/okta-react';

class FileExport extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.onExport = this.onExport.bind(this);
    }
    
    onExport() {
//        console.log('In FileExport.onExport this.props.state.type=',this.props.state.type,' this.props.state.name=',this.props.state.name);
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(this.props.state, null, 2)]));
//        console.log('In FileExport.exportDesign url=', url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.props.state.name + '.json');
//        console.log('In FileExport.exportDesign link=', link);
        document.body.appendChild(link);
        link.click();
        logUsage('event', 'FileExport', { 'event_label': this.props.state.type + ' ' + this.props.state.name });
    }

    render() {
//        console.log('In FileExport.render');
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
    state: state
});

const mapDispatchToProps = {
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(FileExport)
);
