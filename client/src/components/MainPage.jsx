import React, { Component } from 'react';
import {
    Container,
    Tabs,
    Tab,
    Row
} from 'react-bootstrap';
import classnames from 'classnames';
import ExecutePanel from './ExecutePanel';
import { connect } from 'react-redux';
import SignIn from '../menus/Session/SignIn';
import SignOut from '../menus/Session/SignOut';
import { withOktaAuth } from '@okta/okta-react';
import { changeUser, changeView, deleteAutoSave } from '../store/actionCreators';
import config from '../config';
import ResultTable from './ResultTable';

class MainPage extends Component {
    
    constructor(props) {
//        console.log("In MainPage.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.setView = this.setView.bind(this);
        this.props.changeView(config.url.view);
        this.state = {
            isOpen: false,
            activeTab: config.url.view,
        };
    }

    toggle() {
//        console.log('In MainPage.toggle');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    setView(view) {
//        console.log('In MainPage.setView view=',view);
        this.props.changeView(view); // Update the model
    }
    
    render() {
        console.log('In MainPage.render this=',this);
        // If you're waiting to logged in then there is nothing to display OR
        // If there is no name or type then there is no model therefore there is nothing to display
        if (this.props.name === null || this.props.type === null || !this.props.symbol_table) return null;

        var { getViewNames } = require('../designtypes/'+this.props.type+'/view.js'); // Dynamically load getViewNames
        var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components

        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);

      return (
            <>
                <Container style={{backgroundColor: '#eee', paddingTop: '60px'}}>
                    <ExecutePanel />
                    <Row>
                        <ResultTable />
                    </Row>
                    <Tabs defaultActiveKey={config.url.view} activeKey={this.state.activeTab}>
                        {viewNames.map((element) => {return (
                            <Tab key={element.title} eventKey={element.name}>
                                <div id={'main_'+element.name}>
                                    {element.component}
                                </div>
                            </Tab>
                            );
                        })}
                    </Tabs>
                </Container>
            </>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.name,
    view: state.view,
    type: state.model.type,
    symbol_table: state.model.symbol_table,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    changeView: changeView,
    deleteAutoSave: deleteAutoSave
};

export default withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MainPage)
);
