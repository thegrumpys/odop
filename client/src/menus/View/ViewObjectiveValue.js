import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';

class ViewObjectiveValue extends Component {

    constructor(props) {
//        console.log('In ViewSymbolTable.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.renderElementHeader = this.renderElementHeader.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.state = {
            modal: false,
        };
    }
    
    toggle() {
//        console.log('In ViewSymbolTable.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewSymbolTable', { event_label: 'ViewSymbolTable'});
    }
    
    renderElementHeader() {
        return (
            <tr key="table-head-row">
                <th>#</th>
                <th>name</th>
                <th>value</th>
                <th>cmin</th>
                <th>cmax</th>
                <th>sdlim</th>
                <th>smin</th>
                <th>smax</th>
                <th>validity_vmin</th>
                <th>validity_vmax</th>
                <th>feasibility_vmin</th>
                <th>feasibility_vmax</th>
                <th>validity_vmin**2</th>
                <th>validity_vmax**2</th>
                <th>feasibility_vmin**2</th>
                <th>feasibility_vmax**2</th>
            </tr>
        );
    }
    
    renderElement(element, i) {
        var validity_vmin;
        var validity_vmax;
        var feasibility_vmin;
        var feasibility_vmax;
        if (element.type === "equationset" && element.input) { // Independent Variable
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-element.value + element.validmin);
                validity_vmax = ( element.value - element.validmax);
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (validity_vmin <= 0.0) {
                validity_vmin = '';
            }
            if (validity_vmax <= 0.0) {
                validity_vmax = '';
            }
            if (element.lmin & CONSTRAINED) {
                feasibility_vmin = (-element.value + element.cmin) / element.smin;
            } else {
                feasibility_vmin = 0.0;
            }
            if (element.lmax & CONSTRAINED) {
                feasibility_vmax = ( element.value - element.cmax) / element.smax;
            } else {
                feasibility_vmax = 0.0;
            }
            if (feasibility_vmin <= 0.0) {
                feasibility_vmin = '';
            }
            if (feasibility_vmax <= 0.0) {
                feasibility_vmax = '';
            }
        } else if ((element.type === "equationset" && !element.input) || element.type === "calcinput") { // Dependent Variable
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-element.value + element.validmin);
                validity_vmax = ( element.value - element.validmax);
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (validity_vmin <= 0.0) {
                validity_vmin = '';
            }
            if (validity_vmax <= 0.0) {
                validity_vmax = '';
            }
            if (element.lmin & FIXED) {
                feasibility_vmin = (-element.value + element.cmin) / element.smin;
                feasibility_vmax = -feasibility_vmin;
            } else {
                if (element.lmin & CONSTRAINED) {
                    feasibility_vmin = (-element.value + element.cmin) / element.smin;
                } else {
                    feasibility_vmin = 0.0;
                }
                if (element.lmax & CONSTRAINED) {
                    feasibility_vmax = ( element.value - element.cmax) / element.smax;
                } else {
                    feasibility_vmax = 0.0;
                }
            }
            if (feasibility_vmin <= 0.0) {
                feasibility_vmin = '';
            }
            if (feasibility_vmax <= 0.0) {
                feasibility_vmax = '';
            }
        }
        return (
            <tr key={element.name}>
                <td>{i}</td>
                <td>{element.name}</td>
                <td>{element.value}</td>
                <td>{element.cmin}</td>
                <td>{element.cmax}</td>
                <td>{element.sdlim}</td>
                <td>{element.smin}</td>
                <td>{element.smax}</td>
                <td>{validity_vmin}</td>
                <td>{validity_vmax}</td>
                <td>{feasibility_vmin}</td>
                <td>{feasibility_vmax}</td>
                <td>{Math.pow(validity_vmin,2)}</td>
                <td>{Math.pow(validity_vmax,2)}</td>
                <td>{Math.pow(feasibility_vmin,2)}</td>
                <td>{Math.pow(feasibility_vmax,2)}</td>
            </tr>
        );
    }

    render() {
//        console.log('In ViewSymbolTable.render this.props=', this.props);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    ObjectiveValue
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : ObjectiveValue = {this.props.objective_value}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre className="view-table-fixed-2-columns">
                            <table className="report-table-borders">
                                <thead>
                                    {this.renderElementHeader()}
                                </thead>
                                <tbody>
                                    {this.props.symbol_table.map((element, i) => this.renderElement(element,i))}
                                </tbody>
                            </table>
                        </pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    objective_value: state.model.result.objective_value,
});

export default connect(mapStateToProps)(ViewObjectiveValue);
