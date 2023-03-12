import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSymbolValue, saveAutoSave } from '../../store/actionCreators';
import { logUsage, logValue } from '../../logUsage';

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

    componentDidMount() {
//        console.log('In ActionSelectCatalog.componentDidMount this.state=',this.state);
        this.updateCatalogNames();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
//            console.log('In ActionSelectCatalog.componentDidUpdate prevPropsprev.type=',prevProps.type,'props.type=',this.props.type);
            this.updateCatalogNames();
        }
    }
    
    updateCatalogNames() {
//        console.log('In ActionSelectCatalog.updateCatalogNames');
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
//        console.log('In ActionSelectCatalog.toggle names=',names);
        var name;
        var entry_string;
        const { store } = this.context;
        // Loop to create st from symbol_table, and initialize names/name and entries/entry
        var st = [];
        this.props.symbol_table.forEach((element) => {
            st.push(Object.assign({},element));
            if (element.name === "Catalog_Name") {
                name = names[0]; // Default to first name
                if (element.value !== "") {
                    name = element.value;
                }
            }
            if (element.name === "Catalog_Number") {
                entry_string = ""; // Default to blank entry string
                if (element.value !== "") {
                    entry_string = element.value;
                }
            }
        });
        var entries = getCatalogEntries(name, store, st, this.props.system_controls.viol_wt);
        var entry = 0; // Default to first entry
        entries.forEach((element, index) => {
            if (element[0] === entry_string) {
                entry = index;
            }
        });
//        console.log('names=',names,'name=',name,'entries=',entries,'entry=',entry);
        this.setState({
            names: names,
            name: name,
            entries: entries,
            entry: entry
        });
    }
    
    toggle() {
//        console.log('In ActionSelectCatalog.toggle');
        this.updateCatalogNames();
        this.setState({
            modal: !this.state.modal,
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
//        console.log('In ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
        var entry = parseFloat(event.target.value);
        this.setState({
            entry: entry
        });
    }

    onSelect() {
//        console.log('In ActionSelectCatalog.onSelect this.state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        // Do select catalog entry
        logUsage('event', 'ActionSelectCatalog', { event_label: this.state.name + ' ' + this.state.entries[this.state.entry][0] });
        this.props.saveAutoSave();
//        console.log('In ActionSelectCatalog.onSelect this.state.entries=',this.state.entries);
        this.state.entries[this.state.entry][2].forEach((element) => { 
//            console.log('In ActionSelectCatalog.onSelect element=',element);
            this.props.changeSymbolValue(element[0],element[1]);
            logValue(element[0],element[1]);
        });
        // The catalog name and number must be set after setting the affected symbols table entries
        this.props.changeSymbolValue('Catalog_Name',this.state.name);
        logValue('Catalog_Name',this.state.name);
        this.props.changeSymbolValue('Catalog_Number',this.state.entries[this.state.entry][0]);
        logValue('Catalog_Number',this.state.entries[this.state.entry][0]);
    }

    onCancel() {
//        console.log('In ActionSelectCatalog.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In ActionSelectCatalog.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle} disabled={this.state.names.length === 0}>
                    Select Catalog&hellip;
                </NavDropdown.Item>
                <Modal show={this.state.modal} size="lg" onHide={this.onCancel}>
                    <Modal.Header closeButton>
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
                            <>
                                <Form.Label htmlFor="catalogEntrySelect">Closest catalog entries:</Form.Label>
                                <Table className="border border-secondary" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Values</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.entries.map((element, index) => (
                                            <tr key={index}>
                                                <td><Form.Check type='radio' name="catalogEntrySelect" id="catalogEntrySelect" checked={index === this.state.entry} label={element[0]} onChange={this.onSelectCatalogEntry} value={index}></Form.Check></td>
                                                <td>{element[1]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.onSelect} disabled={this.state.entries.length === 0}>Select</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}  

ActionSelectCatalog.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectCatalog);
