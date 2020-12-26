import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { search, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';

class ActionSearch extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        logUsage('event', 'ActionSearch', { 'event_label': 'ActionSearch'});
        this.props.saveAutoSave();
        this.props.search();
    }

    render() {
//        console.log('In ActionSearch.render this=',this);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Search
                </NavDropdown.Item>
            </React.Fragment>
        );
    }
}  

const mapDispatchToProps = {
    search: search,
    saveAutoSave: saveAutoSave
};

export default connect(null, mapDispatchToProps)(ActionSearch);
