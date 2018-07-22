import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class ActionSearch extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        // DO THE SEARCH
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Search
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSearch);
