import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Container,
    Row,
    Col,
    Jumbotron,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import DesignTable from './DesignTable';
import { connect } from 'react-redux';

export class App extends Component {
    
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
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
                    <NavbarBrand href="/">PCyl-Web</NavbarBrand>
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
                                    <DropdownItem>
                                        Search
                                    </DropdownItem>
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
                                        Define Classes
                                    </DropdownItem>
                                    <DropdownItem>
                                        Display Classes
                                    </DropdownItem>
                                    <DropdownItem>
                                        Static Quantities
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
                                        Tutorial
                                    </DropdownItem>
                                    <DropdownItem>
                                        Tutorial
                                    </DropdownItem>
                                    <DropdownItem>
                                        About
                                    </DropdownItem>
                               </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>{this.props.name} Design</h1>
                                <h2>{this.props.comment}</h2>
                                <DesignTable />
                                <div className="text-center">Design Model Version {this.props.version}</div>
                            </Col>
                        </Row>
                    </Container>
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
