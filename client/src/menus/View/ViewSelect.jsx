import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { changeView } from '../../store/actionCreators';

class ViewSelect extends Component {

    constructor(props) {
//        console.log('In ViewSelect.constructor props=',props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(event) {
//        console.log('In ViewSelect.onClick this=',this,'event=',event);
//        console.log('In ViewSelect.onClick event.target.id=',event.target.id);
//        this.props.parent.setKey(view);
        this.props.changeView(event.target.id);
        logUsage('event', 'ViewSelect', { event_label: event.target.id});
    }
    
    render() {
//        console.log('In ViewSelect.render this=',this);
        return (
            <>
                {this.props.viewNames.map((element) => {return (
                    <NavDropdown.Item key={element.title} id={element.name} onClick={this.onClick}>
                        {element.title}
                    </NavDropdown.Item>
                )})}
            </>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.model.type,
});

const mapDispatchToProps = {
    changeView: changeView,
};

export default connect(mapStateToProps,mapDispatchToProps)(ViewSelect);
