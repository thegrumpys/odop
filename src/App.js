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
import HelpAbout from './menus/Help/HelpAbout';
import ActionSearch from './menus/Action/ActionSearch';

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
                                    <DropdownItem>
                                        Open
                                    </DropdownItem>
                                    <DropdownItem>
                                        Save
                                    </DropdownItem>
                                    <DropdownItem>
                                        Save As
                                    </DropdownItem>
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
                                    <DropdownItem>
                                        Execute
                                    </DropdownItem>
                                    <ActionSearch />
                                    <DropdownItem>
                                        Seek
                                    </DropdownItem>
                                    <DropdownItem>
                                        Select Size
                                    </DropdownItem>
                                    <DropdownItem>
                                        Select Catalog
                                    </DropdownItem>
                                    <DropdownItem>
                                        Trade
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
                                    <DropdownItem>
                                        Calculation Inputs
                                    </DropdownItem>
                                    <DropdownItem>
                                        Violations
                                    </DropdownItem>
                                    <DropdownItem>
                                        Report
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
                                    {this.props.comment}
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
    version: state.version,
    comment: state.labels.reduce(function(output, label) {
        if (label.name === 'COMMENT') {
            output += label.value;
        }
        return output;
    },'')
});

export default connect(mapStateToProps)(App);
