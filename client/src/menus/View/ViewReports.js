import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { changeView } from '../../store/actionCreators';

class ViewReports extends Component {

    constructor(props) {
//        console.log('In ViewReports.constructor props=',props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(event) {
//        console.log('In ViewReports.onClick this=',this,'event=',event);
//        console.log('In ViewReports.onClick event.target.id=',event.target.id);
//        this.props.parent.setKey(view);
        this.props.changeView(event.target.id);
    }
    
    render() {
//        console.log('In ViewReports.render this=',this);
        return (
            <React.Fragment>
                {this.props.reportNames.map((element) => {return (
                    <NavDropdown.Item key={element.title} id={element.name} onClick={this.onClick}>
                        {element.title}
                    </NavDropdown.Item>
                )})}
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.model.type,
});

const mapDispatchToProps = {
    changeView: changeView,
};

export default connect(mapStateToProps,mapDispatchToProps)(ViewReports);
