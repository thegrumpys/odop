import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
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
                <Dropdown.Item onClick={this.onHelp}>
                    Index
                </Dropdown.Item>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(HelpIndex);
