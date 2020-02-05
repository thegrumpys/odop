import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Container,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    UncontrolledDropdown,
    Dropdown
} from 'react-bootstrap';
import classnames from 'classnames';
import { ExecutePanel } from './ExecutePanel';
import { DesignTable } from './DesignTable';
import { connect } from 'react-redux';
import FileOpen from '../menus/File/FileOpen';
import FileSave from '../menus/File/FileSave';
import FileSaveAs from '../menus/File/FileSaveAs';
import FileDelete from '../menus/File/FileDelete';
import FileRecent from '../menus/File/FileRecent';
import FilePreferences from '../menus/File/FilePreferences';
import FileProperties from '../menus/File/FileProperties';
import ActionSearch from '../menus/Action/ActionSearch';
import ActionSeek from '../menus/Action/ActionSeek';
import ActionTrade from '../menus/Action/ActionTrade';
import ActionSelectSize from '../menus/Action/ActionSelectSize';
import ActionSelectCatalog from '../menus/Action/ActionSelectCatalog';
import ActionExecute from '../menus/Action/ActionExecute';
import ViewOffsets from '../menus/View/ViewOffsets';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpDemo from '../menus/Help/HelpDemo';
import HelpTutorial from '../menus/Help/HelpTutorial';
import HelpAbout from '../menus/Help/HelpAbout';
import { withAuth } from '@okta/okta-react';

class App extends Component {
    
    constructor(props) {
//        console.log("In App.ctor props=",props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        var { getReportNames } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load getReportNames
        var report_names = getReportNames();
        this.state = {
            isOpen: false,
            activeTab: "1",
            report_names: report_names
        };
    }
    
    toggle() {
//        console.log('In App.toggle');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    toggleTab(tab) {
//        console.log('In App.toggleTab tab=',tab);
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    report(report_name) {
//        console.log('In App.report report_name=',report_name);
        
        // Loop to create prefs from system_controls
        var prefs = [];
        for(var key in this.props.system_controls) {
            prefs.push(this.props.system_controls[key]);
        }

        // Loop to create symbol_table
        var st = [];
        this.props.symbol_table.forEach((element) => {
            st.push(Object.assign({},element));
        });

        // Loop to create labels
        var labels = [];
        this.props.labels.forEach((element) => {
            labels.push(Object.assign({},element));
        });

        // Generate design-type specific report
        var { report } = require('../designtypes/'+this.props.type+'/report.js'); // Dynamically load report
        var output = report(report_name, prefs, st, labels);
        return output;
    }
  
    render() {
//        console.log('In App.render');
        var src = 'designtypes/'+this.props.type+'/favicon.ico';
        var alt = this.props.type+' icon';
//        console.log('src=',src,' alt=',alt);
        return (
            <React.Fragment>
                <Navbar color="white" light expand="md" fixed="top">
                    <NavbarBrand><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <Dropdown.Toggle nav>
                                    File
                                </Dropdown.Toggle>
                                <Dropdown.Menu right>
                                    <FileOpen />
                                    <FileSave />
                                    <FileSaveAs />
                                    <FileDelete />
                                    <Dropdown.Divider />
                                    <FileRecent />
                                    <Dropdown.Divider />
                                    <FilePreferences />
                                    <FileProperties />
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => this.props.auth.logout()}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <Dropdown.Toggle nav>
                                    Action
                                </Dropdown.Toggle>
                                <Dropdown.Menu right>
                                    <ActionSearch />
                                    <ActionSeek />
                                    <ActionTrade />
                                    <Dropdown.Divider />
                                    <ActionSelectSize />
                                    <ActionSelectCatalog />
                                    <Dropdown.Divider />
                                    <ActionExecute />
                               </Dropdown.Menu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <Dropdown.Toggle nav>
                                    View
                                </Dropdown.Toggle>
                                <Dropdown.Menu right>
                                    <Dropdown.Item disabled>
                                        Define  Sub-Problems&hellip;
                                    </Dropdown.Item>
                                    <Dropdown.Item disabled>
                                        Display Sub-Problems&hellip;
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    {process.env.NODE_ENV !== "production" && <ViewOffsets />}
                               </Dropdown.Menu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <Dropdown.Toggle nav>
                                    Help
                                </Dropdown.Toggle>
                                <Dropdown.Menu right>
                                    <Dropdown.Item disabled>
                                        Context Help
                                    </Dropdown.Item>
                                    <HelpIndex />
                                    <HelpDemo />
                                    <HelpTutorial />
                                    <HelpAbout />
                               </Dropdown.Menu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === "1" })} onClick={() => { this.toggleTab("1"); }}>
                                    Design: <img src={src} alt={alt} height="30px"/> {this.props.name}
                                </NavLink>
                            </NavItem>
                            {this.state.report_names.map((element,i) => {return (
                                <NavItem key={element}>
                                    <NavLink className={classnames({ active: this.state.activeTab === (i+2).toString() })} onClick={() => { this.toggleTab((i+2).toString()); }}>
                                        Report: {element}
                                    </NavLink>
                                </NavItem>
                                );
                            })}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container style={{backgroundColor: '#eee', paddingTop: '100px'}}>
                    <ExecutePanel />
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Container fluid>
                                <DesignTable />
                            </Container>
                        </TabPane>
                        {this.state.report_names.map((element,i) => {return (
                            <TabPane key={element} tabId={(i+2).toString()} id="report">
                                {this.report(element)}
                            </TabPane>
                            );
                        })}
                    </TabContent>
                </Container>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.type,
    version: state.version,
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    labels: state.labels,
});

export default withAuth(
        connect(
            mapStateToProps
        )(App)
    );
