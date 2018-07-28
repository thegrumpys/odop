import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { changeName } from '../../actionCreators';

class FileSave extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSave = this.onSave.bind(this);

        this.state = {
            modal: false
        };
    }
    
    putDesign(name) {
        console.log("In putDesign name=", name);
        this.props.changeName(name);
        fetch('/api/v1/designs/'+name, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.state)
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onSave() {
        this.setState({
            modal: !this.state.modal
        });
    console.log(this.state.name);
        // Save the model
        var name = this.state.name;
        if (name === undefined) name = 'checkpt';
        this.putDesign(name);
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.onSave}>
                    Save
                </DropdownItem>
            </React.Fragment>
        );
    }
}  


const mapStateToProps = state => ({
    state: state 
});

const mapDispatchToProps = {
        changeName: changeName
    };

export default connect(mapStateToProps, mapDispatchToProps)(FileSave);
