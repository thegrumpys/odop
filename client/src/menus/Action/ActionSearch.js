import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { search } from '../../actionCreators';

class ActionSearch extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.props.search();
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

const mapDispatchToProps = {
    search: search
};

export default connect(null, mapDispatchToProps)(ActionSearch);
