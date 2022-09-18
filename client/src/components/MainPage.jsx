import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Tabs,
    Tab,
    NavDropdown,
    OverlayTrigger,
    Tooltip,
    Row
} from 'react-bootstrap';
import classnames from 'classnames';
import ExecutePanel from './ExecutePanel';
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
import ViewSelect from '../menus/View/ViewSelect';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import ViewSymbolTable from '../menus/View/ViewSymbolTable';
import ViewObjectiveValue from '../menus/View/ViewObjectiveValue';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import SearchDocs from './SearchDocs';
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
            var { getViewNames } = require('../designtypes/'+this.props.type+'/view.js'); // Dynamically load getViewNames
            var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//            console.log('In MainPage.componentDidUpdate viewNames=', viewNames);
            var view = viewNames.find(element => element.name === this.props.view);
//            console.log('In MainPage.componentDidUpdate view=', view);
            if (view === undefined)
                this.props.changeView(config.env.view); // if not found then assume the configured default
        }
        if (prevProps.view !== this.props.view) {
//            console.log('In MainPage.componentDidUpdate prevProps.view=',prevProps.view,'props.view=',this.props.view);
            this.setState({
                activeTab: this.props.view
            });
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
        this.props.changeView(view); // Update the model
    }
    
    render() {
        console.log('In MainPage.render this=',this);
        // If you're waiting to logged in then there is nothing to display OR
        // If there is no name or type then there is no model therefore there is nothing to display
        if (this.props.authState.isPending || this.props.name === null || this.props.type === null) return null;

        var { getViewNames } = require('../designtypes/'+this.props.type+'/view.js'); // Dynamically load getViewNames
        var viewNames = getViewNames(); // Get them in MainPage render because they are now React Components
//      console.log('In MainPage.constructor viewNames=', viewNames);

        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);

        const logOnOff = this.props.authState.isAuthenticated ? <SignOut /> : <SignIn />;
        return (
            <>
                <Navbar variant="light" bg="light" expand="md" fixed="top">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br/>Save your work first!<br/>See Help AutoSave.</Tooltip>}>
                    <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</Navbar.Brand>
                  </OverlayTrigger>
                  <Navbar.Toggle onClick={this.toggle} />
                    <Navbar.Collapse in={this.state.isOpen}>
                        <Nav className="mr-auto">
                            {logOnOff}
                            <NavDropdown title="File" renderMenuOnMount={true}>
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
                                <ViewSelect viewNames={viewNames}/>
                                <NavDropdown.Divider />
                                {config.node.env !== "production" && <ViewOffsets />}
                                {config.node.env !== "production" && <ViewSymbolTableOffsets />}
                                {config.node.env !== "production" && <ViewSymbolTable />}
                                {config.node.env !== "production" && <ViewObjectiveValue />}
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
                                <SearchDocs />
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className={classnames({ active: this.state.activeTab === "Advanced" })} onClick={() => { this.setView("Advanced"); }}>
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
