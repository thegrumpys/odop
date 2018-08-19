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
    Jumbotron,
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
import HelpIndex from '../menus/Help/HelpIndex';
import HelpAbout from '../menus/Help/HelpAbout';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            activeTab: '1'
        };
    }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
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
                <Navbar color="inverse" light expand="md">
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
                                        Execute
                                    </DropdownItem>
                               </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    View
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem disabled>
                                        Define  Sub-Problems
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        Display Sub-Problems
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem disabled>
                                        Report
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <ViewViolations />
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
                                        Demo
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        Tutorial
                                    </DropdownItem>
                                    <HelpAbout />
                               </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })}>
                                    <img src={src} alt={alt}/>{this.props.name}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Container fluid>
                                <DesignTable />
                            </Container>
                        </TabPane>
                    </TabContent>
                </Jumbotron>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.type,
    version: state.version
});

export default connect(mapStateToProps)(App);
