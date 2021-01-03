import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Tabs,
    Tab,
    NavDropdown,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import ExecutePanel from './ExecutePanel';
import DesignTable from './DesignTable';
import { connect } from 'react-redux';
import SignIn from '../menus/Session/SignIn';
import SignOut from '../menus/Session/SignOut';
import FileOpen from '../menus/File/FileOpen';
import FileSave from '../menus/File/FileSave';
import FileSaveAs from '../menus/File/FileSaveAs';
import FileDelete from '../menus/File/FileDelete';
import FileRecent from '../menus/File/FileRecent';
import FilePreferences from '../menus/File/FilePreferences';
import FileProperties from '../menus/File/FileProperties';
import FileImport from '../menus/File/FileImport';
import FileExport from '../menus/File/FileExport';
import ActionSearch from '../menus/Action/ActionSearch';
import ActionSeek from '../menus/Action/ActionSeek';
import ActionTrade from '../menus/Action/ActionTrade';
import ActionSelectSize from '../menus/Action/ActionSelectSize';
import ActionSelectCatalog from '../menus/Action/ActionSelectCatalog';
import ActionExecute from '../menus/Action/ActionExecute';
import ViewCADModel from '../menus/View/ViewCADModel';
import ViewReports from '../menus/View/ViewReports';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import ViewSymbolTable from '../menus/View/ViewSymbolTable';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import { withOktaAuth } from '@okta/okta-react';
import { logUsage } from '../logUsage';
import { changeUser, changeView, deleteAutoSave } from '../store/actionCreators';
import config from '../config';
import queryString from 'query-string';

class MainPage extends Component {
    
    constructor(props) {
//        console.log("In MainPage.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.setView = this.setView.bind(this);
        var { view } = queryString.parse(location.search);
        view = view !== undefined ? view : config.design.view;
        this.props.changeView(view);
        this.state = {
            isOpen: false,
            activeTab: view,
        };
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In MainPage.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.authState.isAuthenticated !== this.props.authState.isAuthenticated) {
//            console.log('In MainPage.componentDidUpdate prevProps.authState.isAuthenticated=',prevProps.authState.isAuthenticated,'props.authState.isAuthenticated=',this.props.authState.isAuthenticated);
            if (this.props.authState.isAuthenticated) {
//                console.log('In MainPage.componentDidUpdate isAuthenticated this.props.authState.idToken.claims.sub=',this.props.authState.idToken.claims.sub);
                this.props.changeUser(this.props.authState.idToken.claims.sub);
            } else {
//                console.log('In MainPage.componentDidUpdate !isAuthenticated');
                this.props.changeUser(null);
            }
        }
        if (prevProps.type !== this.props.type) {
//            console.log('In MainPage.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
            var reportNames = getReportNames(); // Get them in MainPage render because they are now React Components
//            console.log('In MainPage.componentDidUpdate reportNames=', reportNames);
            var view = reportNames.find(element => element.name === this.props.view);
//            console.log('In MainPage.componentDidUpdate view=', view);
            if (view === undefined)
                this.props.changeView(config.design.view); // if not found then assume the configured default
        }
        if (prevProps.view !== this.props.view) {
//            console.log('In MainPage.componentDidUpdate prevProps.view=',prevProps.view,'props.view=',this.props.view);
            this.setView(this.props.view);
      }
    }

    toggle() {
//        console.log('In MainPage.toggle');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    setView(view) {
//        console.log('In MainPage.setView view=',view);
        logUsage('event', 'Tab', { 'event_label': view });
        if (this.state.activeTab !== view) {
            this.setState({
                activeTab: view
            });
        }
    }
    
    render() {
//        console.log('In MainPage.render this=',this);
        // If you're waiting to logged in then there is nothing to display OR
        // If there is no name or type then there is no model therefore there is nothing to display
        if (this.props.authState.isPending || this.props.name === null || this.props.type === null) return null;

        var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
        var reportNames = getReportNames(); // Get them in MainPage render because they are now React Components
//      console.log('In MainPage.constructor reportNames=', reportNames);

        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);

        const logOnOff = this.props.authState.isAuthenticated ? <SignOut /> : <SignIn />;
        return (
            <React.Fragment>
                <Navbar variant="light" bg="light" expand="md" fixed="top">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br/>Save your work first!<br/>See Help AutoSave.</Tooltip>}>
                    <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</Navbar.Brand>
                  </OverlayTrigger>
                  <Navbar.Toggle onClick={this.toggle} />
                    <Navbar.Collapse in={this.state.isOpen}>
                        <Nav className="mr-auto">
                            {logOnOff}
                            <NavDropdown title="File" renderMenuOnMount=true>
                                <FileOpen />
                                <FileRecent />
                                <FileSave />
                                <FileSaveAs />
                                <FileDelete />
                                <NavDropdown.Divider />
                                <FileImport />
                                <FileExport />
                                <NavDropdown.Divider />
                                <FilePreferences />
                                <FileProperties />
                            </NavDropdown>
                            <NavDropdown title="Action">
                                <ActionSearch />
                                <ActionSeek />
                                <ActionTrade />
                                <NavDropdown.Divider />
                                <ActionSelectSize />
                                <ActionSelectCatalog />
                                <NavDropdown.Divider />
                                <ActionExecute />
                            </NavDropdown>
                            <NavDropdown title="View">
                                {this.props.type === "Spring/Extension" && <ViewCADModel />}
                                {this.props.type === "Spring/Extension" && <NavDropdown.Divider />}
                                <NavDropdown.Item disabled>
                                    Define  Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Item disabled>
                                    Display Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <ViewReports reportNames={reportNames}/>
                                <NavDropdown.Divider />
                                {process.env.NODE_ENV !== "production" && <ViewOffsets />}
                                {process.env.NODE_ENV !== "production" && <ViewSymbolTableOffsets />}
                                {process.env.NODE_ENV !== "production" && <ViewSymbolTable />}
                            </NavDropdown>
                            <NavDropdown title="Help">
                                <HelpMotd />
                                <HelpIndex />
                                <HelpDemo />
                                <HelpTutorial />
                                <HelpAbout />
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link className={classnames({ active: this.state.activeTab === "View0" })} onClick={() => { this.setView("View0"); }}>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Design type is {this.props.type}</Tooltip>}>
                                        <img className="d-none d-md-inline" src={src} alt={alt} height="30px"/>
                                    </OverlayTrigger>
                                    &nbsp;{this.props.name}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container style={{backgroundColor: '#eee', paddingTop: '60px'}}>
                    <ExecutePanel />
                    <Tabs defaultActiveKey={config.design.view} activeKey={this.state.activeTab}>
                        {reportNames.map((element) => {return (
                            <Tab key={element.title} eventKey={element.name}>
                                <div id={element.name}>{element.component}</div>
                            </Tab>
                            );
                        })}
                    </Tabs>
                </Container>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.name,
    view: state.view,
    type: state.model.type,
});

const mapDispatchToProps = {
    changeUser: changeUser,
    changeView: changeView,
    deleteAutoSave: deleteAutoSave
};

export default withRouter(withOktaAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MainPage)
));
