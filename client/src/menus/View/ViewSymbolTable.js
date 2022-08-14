import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewSymbolTable extends Component {

    constructor(props) {
//        console.log('In ViewSymbolTable.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
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

    render() {
//        console.log('In ViewSymbolTable.render this.props=', this.props);
        var flags = ['','CONSTRAINED','FIXED','CONSTRAINED|FIXED','FDCL','CONSTRAINED|FDCL','FIXED|FDCL','CONSTRAINED|FIXED|FDCL']
        var yn = b => b ? 'Y' : 'N';
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    SymbolTable
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : SymbolTable
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre className="view-table-fixed-2-columns">
                            <table className="report-table-borders">
                                <thead>
                                    <tr key="table-head-row">
                                        <th>#</th>
                                        <th>name</th>
                                        <th>value</th>
                                        <th>oldvalue</th>
                                        <th>units</th>
                                        <th>type</th>
                                        <th>input</th>
                                        <th>hidden</th>
                                        <th>format</th>
                                        <th>table</th>
                                        <th>cminchoices</th>
                                        <th>cminchoice</th>
                                        <th>cmaxchoices</th>
                                        <th>cmaxchoice</th>
                                        <th>validminchoices</th>
                                        <th>validminchoice</th>
                                        <th>validmaxchoices</th>
                                        <th>validmaxchoice</th>
                                        <th>propagate</th>
                                        <th>lmin</th>
                                        <th>validmin</th>
                                        <th>cmin</th>
                                        <th>smin</th>
                                        <th>vmin</th>
                                        <th>lmax</th>
                                        <th>validmax</th>
                                        <th>cmax</th>
                                        <th>smax</th>
                                        <th>vmax</th>
                                        <th>oldlmin</th>
                                        <th>oldcmin</th>
                                        <th>oldlmax</th>
                                        <th>oldcmax</th>
                                        <th>sdlim</th>
                                        <th>tooltip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.symbol_table.map((element,i) => {
                                        return (
                                            <tr key={element.name}>
                                                <td>{i}</td>
                                                <td>{element.name}</td>
                                                <td>{element.value}</td>
                                                <td>{element.oldvalue}</td>
                                                <td>{element.units}</td>
                                                <td>{element.type}</td>
                                                <td>{yn(element.input)}</td>
                                                <td>{yn(element.hidden)}</td>
                                                <td>{element.format}</td>
                                                <td>{element.table}</td>
                                                <td>{JSON.stringify(element.cminchoices)}</td>
                                                <td>{element.cminchoice}</td>
                                                <td>{JSON.stringify(element.cmaxchoices)}</td>
                                                <td>{element.cmaxchoice}</td>
                                                <td>{JSON.stringify(element.validminchoices)}</td>
                                                <td>{element.validminchoice}</td>
                                                <td>{JSON.stringify(element.validmaxchoices)}</td>
                                                <td>{element.validmaxchoice}</td>
                                                <td>{JSON.stringify(element.propagate)}</td>
                                                <td>{flags[element.lmin]}</td>
                                                <td>{String(element.validmin)}</td>
                                                <td>{String(element.cmin)}</td>
                                                <td>{String(element.smin)}</td>
                                                <td>{String(element.vmin)}</td>
                                                <td>{flags[element.lmax]}</td>
                                                <td>{String(element.validmax)}</td>
                                                <td>{String(element.cmax)}</td>
                                                <td>{String(element.smax)}</td>
                                                <td>{String(element.vmax)}</td>
                                                <td>{element.oldlmin}</td>
                                                <td>{element.oldcmin}</td>
                                                <td>{element.oldlmax}</td>
                                                <td>{element.oldcmax}</td>
                                                <td>{element.sdlim}</td>
                                                <td>{element.tooltip}</td>
                                            </tr>
                                        );
                                    })}
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
    system_controls: state.model.system_controls,
    labels: state.model.labels
});

export default connect(mapStateToProps)(ViewSymbolTable);
