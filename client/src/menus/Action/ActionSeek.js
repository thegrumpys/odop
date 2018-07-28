import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { seek } from '../../actionCreators';

class ActionSeek extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.props.seek();
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Seek
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapDispatchToProps = {
    seek: seek
};

export default connect(null, mapDispatchToProps)(ActionSeek);
