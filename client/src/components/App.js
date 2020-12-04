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
import classnames from 'classnames';
import { deleteAutoSave } from '../store/actionCreators';
import ExecutePanel from './ExecutePanel';
import DesignTable from './DesignTable';
import { connect } from 'react-redux';
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
import ViewReports from '../menus/View/ViewReports';
import ViewOffsets from '../menus/View/ViewOffsets';
import ViewSymbolTableOffsets from '../menus/View/ViewSymbolTableOffsets';
import HelpMotd from '../menus/Help/HelpMotd';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import { withAuth } from '@okta/okta-react';
import { logUsage } from '../logUsage';

class App extends Component {
    
    constructor(props) {
//        console.log("In App.constructor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.setKey = this.setKey.bind(this);
        var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
        var report_names = getReportNames();
//        console.log('In App.constructor report_names=', report_names);
        this.state = {
            isOpen: false,
            activeTab: "View0",
            report_names: report_names
        };
    }
    
    componentDidUpdate(prevProps) {
//        console.log('In App.componentDidUpdate');
        if (prevProps.type !== this.props.type) {
//            console.log('In App.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
            var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
            var report_names = getReportNames();
//            console.log('In App.componentDidUpdate report_names=', report_names);
            this.setState({
                report_names: report_names,
            });
        }
    }

    toggle() {
//        console.log('In App.toggle');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    setKey(tab) {
        console.log('In App.setKey tab=',tab);
        logUsage('event', 'Tab', { 'event_label': tab });
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    render() {
//        console.log('In App.render this.props=', this.props);
        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);
        return (
            <React.Fragment>
                <Navbar variant="light" bg="light" expand="md" fixed="top">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset app.<br/>Save your work first!<br/>See Help AutoSave.</Tooltip>}>
                    <Navbar.Brand href="/"><img className="d-none d-md-inline" src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</Navbar.Brand>
                  </OverlayTrigger>
                  <Navbar.Toggle onClick={this.toggle} />
                    <Navbar.Collapse in={this.state.isOpen}>
                        <Nav className="mr-auto">
                            <NavDropdown title="File">
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
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {this.props.deleteAutoSave();this.props.auth.logout()}}>
                                    Logout
                                </NavDropdown.Item>
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
                                <NavDropdown.Item disabled>
                                    Define  Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Item disabled>
                                    Display Sub-Problems&hellip;
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <ViewReports parent={this} report_names={this.state.report_names}/>
                                <NavDropdown.Divider />
                                {process.env.NODE_ENV !== "production" && <ViewOffsets />}
                                {process.env.NODE_ENV !== "production" && <ViewSymbolTableOffsets />}
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
                                <Nav.Link className={classnames({ active: this.state.activeTab === "View0" })} onClick={() => { this.setKey("View0"); }}>
                                    <span className="d-none d-md-inline">Design: </span>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Design type is {this.props.type}</Tooltip>}>
                                        <img className="d-none d-md-inline" src={src} alt={alt} height="30px"/>
                                    </OverlayTrigger>
                                    {this.props.name}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container style={{backgroundColor: '#eee', paddingTop: '60px'}}>
                    <ExecutePanel />
                    <Tabs defaultActiveKey="View0" activeKey={this.state.activeTab}>
                        <Tab eventKey="View0">
                            <Container fluid id="view-0">
                                <DesignTable />
                            </Container>
                        </Tab>
                        {this.state.report_names.map((element,i) => {return (
                            <Tab key={element.name} eventKey={"View"+(i+1).toString()}>
                                <div id={"view-"+(i+1).toString()}>{element.component}</div>
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
    type: state.model.type,
    version: state.model.version,
});

const mapDispatchToProps = {
    deleteAutoSave: deleteAutoSave
};

export default withAuth(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
