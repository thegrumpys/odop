import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { search, auto_save } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';

class ActionSearch extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        logUsage('event', 'ActionSearch');
        this.props.auto_save();
        this.props.search();
    }

    render() {
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
    auto_save: auto_save
};

export default connect(null, mapDispatchToProps)(ActionSearch);
