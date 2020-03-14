import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../../store/actionCreators';

class ActionSelectCatalog extends Component {

    constructor(props) {
//        console.log('In ActionSelectCatalog.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectCatalogName = this.onSelectCatalogName.bind(this);
        this.onSelectCatalogEntry = this.onSelectCatalogEntry.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            names: [],
            name: undefined,
            entries: [],
            entry: 0
        };
    }

    toggle() {
//        console.log('In ActionSelectCatalog.toggle');
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
        var name;
        if (names.length > 0)
            name = names[0]; // Default to first name
        const { store } = this.context;
        // Loop to create st from symbol_table
        var st = [];
        this.props.symbol_table.forEach((element) => {
            st.push(Object.assign({},element));
        });
        var entries = getCatalogEntries(name, store, st, this.props.system_controls.viol_wt);
        var entry = 0; // Default to first entry
        this.setState({
            modal: !this.state.modal,
            names: names,
            name: name,
            entries: entries,
            entry: entry
        });
    }

    onSelectCatalogName(event) {
//        console.log('In ActionSelectCatalog.onSelectCatalogName event.target.value=',event.target.value);
        var name = event.target.value;
        var { getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogEntries
        const { store } = this.context;
        // Loop to create p and x from symbol_table
        var st = [];
        this.props.symbol_table.forEach((element) => {
            st.push(Object.assign({},element));
        });
        var entries = getCatalogEntries(name, store, st, this.props.system_controls.viol_wt);
        var entry = 0; // Default to first entry
        this.setState({
            name: name,
            entries: entries,
            entry: entry
        });
    }

    onSelectCatalogEntry(event) {
//      console.log('In ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
      this.setState({
          entry: parseFloat(event.target.value) 
      });
  }

    onSelect() {
//        console.log('In ActionSelectCatalog.onSelect this.state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        // Do select catalog entry
        window.gtag('event', 'ActionSelectCatalog', { 'event_category': 'menu' });
//        console.log('In ActionSelectCatalog.onSelect this.state.entries=',this.state.entries);
        this.state.entries[this.state.entry][2].forEach((element) => { 
//            console.log('In ActionSelectCatalog.onSelect element=',element);
            this.props.changeSymbolValue(element[0],element[1]);
        });
    }

    onCancel() {
//        console.log('In ActionSelectCatalog.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In ActionSelectCatalog.render this.state=',this.state);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Select Catalog&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} size="lg">
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Select Catalog
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="catalogNameSelect">Select catalog name:</Form.Label>
                        <Form.Control as="select" id="catalogNameSelect" onChange={this.onSelectCatalogName} value={this.state.name}>
                            {this.state.names.map((element, index) =>
                                <option key={index} value={element}>{element}</option>
                            )}
                        </Form.Control>
                        <br />
                        {this.state.entries.length === 0 ? 
                            <Form.Label htmlFor="catalogEntrySelect">No acceptable entries were found in this catalog</Form.Label>
                        :
                            <React.Fragment>
                                <Form.Label htmlFor="catalogEntrySelect">Closest catalog entries:</Form.Label>
                                <Table className="border border-secondary" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Values</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.entries.length === 0 ? <tr><td colSpan="9">None</td></tr> : '' ||
                                         this.state.entries.map((element, index) => (
                                            <tr key={index}>
                                                <td>{element[0]}</td>
                                                <td>{element[1]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <br />
                                <Form.Label htmlFor="catalogEntrySelect">Select entry:</Form.Label>
                                <Form.Control as="select" id="catalogEntrySelect" onChange={this.onSelectCatalogEntry} value={this.state.entry}>
                                    {this.state.entries.length === 0 ? <option>None</option> : '' || this.state.entries.map((element, index) => (
                                        <option key={index} value={index}>{element[0]}</option>
                                    ))}
                                </Form.Control>
                            </React.Fragment>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.onSelect} disabled={this.state.entries.length === 0}>Select</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}  

ActionSelectCatalog.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectCatalog);
