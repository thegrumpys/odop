import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class HelpIndex extends Component {

    constructor(props) {
        super(props);
        this.onHelp = this.onHelp.bind(this);
    }

    onHelp() {
        window.open('https://thegrumpys.github.io/odop/Help', '_blank');
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.onHelp}>
                    Index
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HelpIndex);
