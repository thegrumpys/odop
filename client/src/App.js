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
import FileOpen from './menus/File/FileOpen';
import FileSave from './menus/File/FileSave';
import FileSaveAs from './menus/File/FileSaveAs';
import FileDelete from './menus/File/FileDelete';
import ActionSearch from './menus/Action/ActionSearch';
import HelpAbout from './menus/Help/HelpAbout';

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
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand href="/"><img src="favicon.ico" alt="The Grumpys"/> PCyl-Web</NavbarBrand>
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
                                    <DropdownItem>
                                        Recent Designs
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Preferences
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    Action
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <ActionSearch store={this.props.store}/>
                                    <DropdownItem>
                                        Seek
                                    </DropdownItem>
                                    <DropdownItem>
                                        Trade
                                    </DropdownItem>
                                        <DropdownItem divider />
                                    <DropdownItem>
                                        Select Size
                                    </DropdownItem>
                                    <DropdownItem>
                                        Select Catalog
                                    </DropdownItem>
                                        <DropdownItem divider />
                                    <DropdownItem>
                                        Execute
                                    </DropdownItem>
                               </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    View
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Define  Sub-Problems
                                    </DropdownItem>
                                    <DropdownItem>
                                        Display Sub-Problems
                                    </DropdownItem>
                                        <DropdownItem divider />
                                    <DropdownItem>
                                        Report
                                    </DropdownItem>
                                        <DropdownItem divider />
                                    <DropdownItem>
                                        Calculation Inputs
                                    </DropdownItem>
                                    <DropdownItem>
                                        Violations
                                    </DropdownItem>
                               </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>
                                    Help
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Context Help
                                    </DropdownItem>
                                    <DropdownItem>
                                        Help Index
                                    </DropdownItem>
                                    <DropdownItem>
                                        Demo
                                    </DropdownItem>
                                    <DropdownItem>
                                        Tutorial
                                    </DropdownItem>
                                    <HelpAbout />
                               </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })}>
                                    {this.props.name}
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
            </div>
        );
    }
    
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.type,
    version: state.version
});

export default connect(mapStateToProps)(App);
