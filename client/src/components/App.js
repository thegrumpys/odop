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
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import classnames from 'classnames';
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
import ViewViolations from '../menus/View/ViewViolations';
import ViewOffsets from '../menus/View/ViewOffsets';
import HelpIndex from '../menus/Help/HelpIndex';
import HelpAbout from '../menus/Help/HelpAbout';
import { getReportNames as pcyl_getReportNames } from '../designtypes/Piston-Cylinder/report';
import { getReportNames as solid_getReportNames } from '../designtypes/Solid/report';
import { getReportNames as spring_getReportNames } from '../designtypes/Spring/report';
import { report as pcyl_report } from '../designtypes/Piston-Cylinder/report';
import { report as solid_report } from '../designtypes/Solid/report';
import { report as spring_report } from '../designtypes/Spring/report';

class App extends Component {
    
    constructor(props) {
//        console.log('In App.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        var report_names;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            report_names = pcyl_getReportNames();
            break;
        case 'Solid':
            report_names = solid_getReportNames();
            break;
        case 'Spring':
            report_names = spring_getReportNames();
            break;
        }
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
//        console.log('In App.report');
        
        var element;

        // Loop to create prefs from system_controls
        var prefs = [];
        for(var key in this.props.system_controls) {
            prefs.push(this.props.system_controls[key]);
        }

        // Loop to create p and x from symbol_table
        var p = [];
        var x = [];
        for (let i = 0; i < this.props.symbol_table.length; i++) {
            element = this.props.symbol_table[i];
            if (element.input) {
                p.push(Object.assign({},element));
            } else {
                x.push(Object.assign({},element));
            }
        }

        // Loop to create p and x from symbol_table
        var labels = [];
        for (let i = 0; i < this.props.labels.length; i++) {
            element = this.props.labels[i];
            labels.push(Object.assign({},element));
        }

        // Generate design-type specific report
        var output;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            output = pcyl_report(report_name, prefs, p, x, labels);
            break;
        case 'Solid':
            output = solid_report(report_name, prefs, p, x, labels);
            break;
        case 'Spring':
            output = spring_report(report_name, prefs, p, x, labels);
            break;
        }
        return output;
    }
  
    render() {
//        console.log('In App.render');
        var src;
        var alt;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            src = 'designtypes/Piston-Cylinder/favicon.ico';
            alt = 'Piston-Cylinder icon';
            break;
        case 'Solid':
            src = 'designtypes/Solid/favicon.ico';
            alt = 'Solid icon';
            break;
        case 'Spring':
            src = 'designtypes/Spring/favicon.ico';
            alt = 'Spring icon';
            break;
        }
//        console.log('src=',src,' alt=',alt);
        return (
            <React.Fragment>
                <Navbar color="white" light expand="md" fixed="top">
                    <NavbarBrand><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>ODOP</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    File
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <FileOpen />
                                    <FileSave />
                                    <FileSaveAs />
                                    <FileDelete />
                                    <DropdownItem divider />
                                    <FileRecent />
                                    <DropdownItem divider />
                                    <FilePreferences />
                                    <FileProperties />
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    Action
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <ActionSearch />
                                    <ActionSeek />
                                    <ActionTrade />
                                    <DropdownItem divider />
                                    <ActionSelectSize />
                                    <ActionSelectCatalog />
                                    <DropdownItem divider />
                                    <DropdownItem disabled>
                                        Execute&hellip;
                                    </DropdownItem>
                               </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    View
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem disabled>
                                        Define  Sub-Problems&hellip;
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        Display Sub-Problems&hellip;
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <ViewViolations />
                                    {process.env.NODE_ENV !== "production" && <ViewOffsets />}
                               </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    Help
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem disabled>
                                        Context Help
                                    </DropdownItem>
                                    <HelpIndex />
                                    <DropdownItem disabled>
                                        Demo&hellip;
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        Tutorial&hellip;
                                    </DropdownItem>
                                    <HelpAbout />
                               </DropdownMenu>
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

export default connect(mapStateToProps)(App);
