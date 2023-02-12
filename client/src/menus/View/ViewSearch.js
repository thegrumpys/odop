import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';

class ViewSearch extends Component {

    constructor(props) {
//        console.log('In ViewSearch.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.renderElementHeader = this.renderElementHeader.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.state = {
            modal: false,
        };
    }
    
    toggle() {
//        console.log('In ViewSearch.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewSearch', { event_label: 'ViewSearch'});
    }

    renderElementHeader() {
        return (
            <tr key="table-head-row">
                <th>#</th>
                <th>name</th>
                <th>shared</th>
                <th>invalid</th>
                <th>infeasible</th>
                <th>%vf_vmin**2</th>
                <th>%vf_vmax**2</th>
                <th>validity_vmin</th>
                <th>validity_vmax</th>
                <th>feasibility_vmin</th>
                <th>feasibility_vmax</th>
                <th>value</th>
                <th>lmin</th>
                <th>lmax</th>
                <th>validmin</th>
                <th>validmax</th>
                <th>cmin</th>
                <th>cmax</th>
                <th>vmin</th>
                <th>vmax</th>
                <th>sdlim</th>
                <th>smin</th>
                <th>smax</th>
            </tr>
        );
    }
    
    renderElement(shared, element, i) {
        var flags = ['','CONSTRAINED','FIXED','CONSTRAINED|FIXED','FDCL','CONSTRAINED|FDCL','FIXED|FDCL','CONSTRAINED|FIXED|FDCL']
        var validity_vmin;
        var validity_vmax;
        var feasibility_vmin;
        var feasibility_vmax;
        var invalid = false;
        var infeasible = false;
        if (element.type === "equationset" && element.input) { // Independent Variable
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-element.value + element.validmin) / element.smin;
                validity_vmax = ( element.value - element.validmax) / element.smax;
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (element.lmin & CONSTRAINED) {
                feasibility_vmin = (-element.value + element.cmin) / element.smin;
            } else {
                feasibility_vmin = 0.0;
            }
            if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                shared.value = shared.value + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
                invalid |= true; infeasible |= true;
            } else if (validity_vmin > 0.0) {
                feasibility_vmin = 0.0;
                shared.value = shared.value + validity_vmin * validity_vmin;
                invalid |= true;
            } else if (feasibility_vmin > 0.0) {
                validity_vmin = 0.0;
                shared.value = shared.value + feasibility_vmin * feasibility_vmin;
                infeasible |= true;
            } else {
                feasibility_vmin = 0.0;
                validity_vmin = 0.0;
            }
            if (element.lmax & CONSTRAINED) {
                feasibility_vmax = ( element.value - element.cmax) / element.smax;
            } else {
                feasibility_vmax = 0.0;
            }
            if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                shared.value = shared.value + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
                invalid |= true; infeasible |= true;
            } else if (validity_vmax > 0.0) {
                feasibility_vmax = 0.0;
                shared.value = shared.value + validity_vmax * validity_vmax;
                invalid |= true;
            } else if (feasibility_vmax > 0.0) {
                validity_vmax = 0.0;
                shared.value = shared.value + feasibility_vmax * feasibility_vmax;
                infeasible |= true;
            } else {
                feasibility_vmax = 0.0;
                validity_vmax = 0.0;
            }
//            console.log('In ViewSearch.renderElement IV    element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'shared.value=',shared.value,'invalid=',invalid,'infeasible=',infeasible);
        } else if (element.type === "equationset" && !element.input) { // Dependent Variable
            /* State variable fix levels. */
            /*
             * The fix_wt's are automatically incorporated in the scaling denominators
             * S(I+N) by the main routine.
             * 
             * This version reduces penalty of large fix violations.
             */
            if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
                validity_vmin = (-element.value + element.validmin) / element.smin;
                validity_vmax = ( element.value - element.validmax) / element.smax;
            } else {
                validity_vmin = 0.0;
                validity_vmax = 0.0;
            }
            if (element.lmin & FIXED) {
                feasibility_vmin = (-element.value + element.cmin) / element.smin;
                if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                    var vmin_sum = feasibility_vmin + validity_vmin;
                    if (vmin_sum > 1.0) {
                        shared.value = shared.value + vmin_sum;
                    } else {
                        shared.value = shared.value + vmin_sum * vmin_sum;
                    }
                    invalid |= true; infeasible |= true;
                } else if (validity_vmin > 0.0) {
                    feasibility_vmin = 0.0;
                    shared.value = shared.value + validity_vmin * validity_vmin;
                    invalid |= true;
                } else if (feasibility_vmin > 0.0) {
                    validity_vmin = 0.0;
                    if (feasibility_vmin > 1.0) {
                        shared.value = shared.value + feasibility_vmin;
                    } else if (feasibility_vmin < -1.0) {
                        shared.value = shared.value - feasibility_vmin;
                    } else {
                        shared.value = shared.value + feasibility_vmin * feasibility_vmin;
                    }
                    infeasible |= true;
                } else {
                    feasibility_vmin = 0.0;
                    validity_vmin = 0.0;
                }
                feasibility_vmax = -feasibility_vmin;
                if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                    var vmax_sum = feasibility_vmax + validity_vmax;
                    if (vmax_sum > 1.0) {
                        shared.value = shared.value + vmax_sum;
                    } else {
                        shared.value = shared.value + vmax_sum * vmax_sum;
                    }
                    invalid |= true; infeasible |= true;
                } else if (validity_vmax > 0.0) {
                    feasibility_vmax = 0.0;
                    shared.value = shared.value + validity_vmax * validity_vmax;
                    invalid |= true;
                } else if (feasibility_vmax > 0.0) {
                    validity_vmax = 0.0;
                    if (feasibility_vmax > 1.0) {
                        shared.value = shared.value + feasibility_vmax;
                    } else if (feasibility_vmax < -1.0) {
                        shared.value = shared.value - feasibility_vmax;
                    } else {
                        shared.value = shared.value + feasibility_vmax * feasibility_vmax;
                    }
                    infeasible |= true;
                } else {
                    feasibility_vmax = 0.0;
                    validity_vmax = 0.0;
                }
            } else {
                if (element.lmin & CONSTRAINED) {
                    feasibility_vmin = (-element.value + element.cmin) / element.smin;
                } else {
                    feasibility_vmin = 0.0;
                }
                if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
                    shared.value = shared.value + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);;
                    invalid |= true; infeasible |= true;
                } else if (validity_vmin > 0.0) {
                    feasibility_vmin = 0.0;
                    shared.value = shared.value + validity_vmin * validity_vmin;
                    invalid |= true;
                } else if (feasibility_vmin > 0.0) {
                    validity_vmin = 0.0;
                    shared.value = shared.value + feasibility_vmin * feasibility_vmin;
                    infeasible |= true;
                } else {
                    feasibility_vmin = 0.0;
                    validity_vmin = 0.0;
                }
                if (element.lmax & CONSTRAINED) {
                    feasibility_vmax = ( element.value - element.cmax) / element.smax;
                } else {
                    feasibility_vmax = 0.0;
                }
                if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
                    shared.value = shared.value + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
                    invalid |= true; infeasible |= true;
                } else if (validity_vmax > 0.0) {
                    feasibility_vmax = 0.0;
                    shared.value = shared.value + validity_vmax * validity_vmax;
                    invalid |= true;
                } else if (feasibility_vmax > 0.0) {
                    validity_vmax = 0.0;
                    shared.value = shared.value + feasibility_vmax * feasibility_vmax;
                    infeasible |= true;
                } else {
                    feasibility_vmax = 0.0;
                    validity_vmax = 0.0;
                }
            }
//            console.log('In ViewSearch.renderElement DV/CI element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'shared.value=',shared.value,'invalid=',invalid,'infeasible=',infeasible);
        } else { // Calculation Input
            validity_vmin = 0.0;
            validity_vmax = 0.0;
            feasibility_vmin = 0.0;
            feasibility_vmax = 0.0;
            invalid = false;
            infeasible = false;
        }
        return (
            <tr key={element.name}>
                <td>{i}</td>
                <td>{element.name}</td>
                <td>{shared.value}</td>
                <td>{invalid ? 'true' : ''}</td>
                <td>{infeasible ? 'true' : ''}</td>
                <td>{(this.props.objective_value === 0.0 || (feasibility_vmin <= 0.0 && validity_vmin <= 0.0)) ? '' : (feasibility_vmin+validity_vmin)*(feasibility_vmin+validity_vmin)*100/this.props.objective_value}</td>
                <td>{(this.props.objective_value === 0.0 || (feasibility_vmax <= 0.0 && validity_vmax <= 0.0)) ? '' : (feasibility_vmax+validity_vmax)*(feasibility_vmax+validity_vmax)*100/this.props.objective_value}</td>
                <td>{validity_vmin <= 0.0 ? '' : validity_vmin}</td>
                <td>{validity_vmax <= 0.0 ? '' : validity_vmax}</td>
                <td>{feasibility_vmin <= 0.0 ? '' : feasibility_vmin}</td>
                <td>{feasibility_vmax <= 0.0 ? '' : feasibility_vmax}</td>
                <td>{element.value}</td>
                <td>{element.lmin !== undefined ? flags[element.lmin] : ''}</td>
                <td>{element.lmin !== undefined ? flags[element.lmax] : ''}</td>
                <td>{element.lmin !== undefined ? element.validmin : ''}</td>
                <td>{element.lmin !== undefined ? element.validmax : ''}</td>
                <td>{element.lmin !== undefined ? element.cmin : ''}</td>
                <td>{element.lmin !== undefined ? element.cmax : ''}</td>
                <td>{element.lmin !== undefined ? element.vmin : ''}</td>
                <td>{element.lmin !== undefined ? element.vmax : ''}</td>
                <td>{element.lmin !== undefined ? element.sdlim : ''}</td>
                <td>{element.lmin !== undefined ? element.smin : ''}</td>
                <td>{element.lmin !== undefined ? element.smax : ''}</td>
            </tr>
        );
    }

    render() {
//        console.log('In ViewSearch.render this.props=', this.props);
        var shared = {value: 0.0};
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Search
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Search
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre className="view-table-fixed-2-columns">
                            <table className="report-table-borders">
                                <thead>
                                    {this.renderElementHeader()}
                                </thead>
                                <tbody>
                                    {this.props.symbol_table.map((element, i) => this.renderElement(shared,element,i))}
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

export default connect(mapStateToProps)(ViewSearch);
