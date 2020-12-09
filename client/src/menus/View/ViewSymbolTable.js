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
        if (this.state.modal) logUsage('event', 'ViewSymbolTable', { 'event_label': 'ViewSymbolTable'});
    }

    render() {
//        console.log('In ViewSymbolTable.render this.props=', this.props);
        var flags = ['','CONSTRAINED','FIXED','CONSTRAINED|FIXED','FDCL','CONSTRAINED|FDCL','FIXED|FDCL','CONSTRAINED|FIXED|FDCL']
        var yn = b => b ? 'Y' : 'N';
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    SymbolTable
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle} size="lg">
                    <Modal.Header>
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
                                        <th>propagate</th>
                                        <th>lmin</th>
                                        <th>cmin</th>
                                        <th>smin</th>
                                        <th>lmax</th>
                                        <th>cmax</th>
                                        <th>smax</th>
                                        <th>oldlmin</th>
                                        <th>oldcmin</th>
                                        <th>oldlmax</th>
                                        <th>oldcmax</th>
                                        <th>ioclass</th>
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
                                                <td>{element.cminchoices}</td>
                                                <td>{element.cminchoice}</td>
                                                <td>{element.cmaxchoices}</td>
                                                <td>{element.cmaxchoice}</td>
                                                <td>{element.propagate}</td>
                                                <td>{flags[element.lmin]}</td>
                                                <td>{String(element.cmin)}</td>
                                                <td>{String(element.smin)}</td>
                                                <td>{flags[element.lmax]}</td>
                                                <td>{String(element.cmax)}</td>
                                                <td>{String(element.smax)}</td>
                                                <td>{element.oldlmin}</td>
                                                <td>{element.oldcmin}</td>
                                                <td>{element.oldlmax}</td>
                                                <td>{element.oldcmax}</td>
                                                <td>{element.ioclass}</td>
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
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels
});

export default connect(mapStateToProps)(ViewSymbolTable);
