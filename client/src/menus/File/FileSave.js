import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { displayError } from '../../components/ErrorModal';
import { displaySpinner } from '../../components/Spinner';
import { logUsage } from '../../logUsage';

class FileSave extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            modal: false
        };
    }
    
    putDesign(type,name) {
//        console.log('In FileSave.putDesign type=', type,' name=', name);
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+type+'/designs/'+name, {
                method: 'PUT', // Update it
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.state)
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                logUsage('function=FileSave,type='+type+',name='+name);
                return res.json()
            })
            .catch(error => {
                displayError('PUT of \''+name+'\' \''+type+'\' design failed with message: \''+error.message+'\'');
            });
    }

    onSave() {
//        console.log('In FileSave.toggle this.props.state.type=',this.props.state.type, ' this.props.state.name=',this.props.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Save the model
        var type = this.props.state.type;
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.props.state.name;
        if (name === undefined) name = 'checkpt';
        this.putDesign(type,name);
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

export default connect(mapStateToProps)(FileSave);
