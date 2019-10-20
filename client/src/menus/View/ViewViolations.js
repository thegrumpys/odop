import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class ViewViolations extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            checked: false
        };
    }
    
    onChange(event) {
//        console.log('In ViewViolations.onChange');
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem disabled>
                    Violations
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ViewViolations);