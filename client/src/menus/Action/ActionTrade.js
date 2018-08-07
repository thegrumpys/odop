import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { trade } from '../../store/actionCreators';

class ActionTrade extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.props.trade();
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Trade
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapDispatchToProps = {
    trade: trade
};

export default connect(null, mapDispatchToProps)(ActionTrade);
