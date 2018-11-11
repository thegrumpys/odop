import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Label, Input, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../../store/actionCreators';

class ActionSelectCatalog extends React.Component {

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
//        console.log('In ActionSelectCatalog componentDidMount this.state=',this.state);
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
        var name;
        if (names.length > 0)
            name = names[0]; // Default to first name
        // Loop to create p and x from symbol_table
        var p = [];
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(Object.assign({},element));
            } else {
                x.push(Object.assign({},element));
            }
        });
        var entries = getCatalogEntries(name, p, x, this.props.system_controls.viol_wt);
        var entry = 0; // Default to first entry
        this.setState({
            names: names,
            name: name,
            entries: entries,
            entry: entry
        });
    }

    toggle() {
//        console.log('In ActionSelectCatalog.toggle');
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
        var name;
        if (names.length > 0)
            name = names[0]; // Default to first name
        // Loop to create p and x from symbol_table
        var p = [];
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(Object.assign({},element));
            } else {
                x.push(Object.assign({},element));
            }
        });
        var entries = getCatalogEntries(name, p, x, this.props.system_controls.viol_wt);
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
        // Loop to create p and x from symbol_table
        var p = [];
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(Object.assign({},element));
            } else {
                x.push(Object.assign({},element));
            }
        });
        var entries = getCatalogEntries(name, p, x, this.props.system_controls.viol_wt);
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
//        console.log('In ActionSelectCatalog.onSelect this.state.entries=',this.state.entries);
        this.state.entries[this.state.entry][1].forEach((element) => { 
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
                <DropdownItem onClick={this.toggle} disabled={this.state.names.length === 0}>
                    Select Catalog&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Select Catalog</ModalHeader>
                    <ModalBody>
                        <Label for="catalogNameSelect">Select catalog name:</Label>
                        <Input type="select" id="catalogNameSelect" onChange={this.onSelectCatalogName} value={this.state.name}>
                            {this.state.names.map((element, index) =>
                                <option key={index} value={element}>{element}</option>
                            )}
                        </Input>
                        <br />
                        <Table className="border border-secondary" size="sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>OD_Free</th>
                                    <th>Wire_Dia</th>
                                    <th>L_Free</th>
                                    <th>Coils_T</th>
                                    <th>Material_Type</th>
                                    <th>End_Type</th>
                                    <th>Obj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.entries.length === 0 ? <tr><td colSpan="9">None</td></tr> : '' ||
                                 this.state.entries.map((element, index) => (
                                    <tr key={index}>
                                        <td><Button size="sm"></Button></td>
                                        <td>{element[0]}</td>
                                        <td>{element[1]}</td>
                                        <td>{element[2]}</td>
                                        <td>{element[3]}</td>
                                        <td>{element[4]}</td>
                                        <td>{element[5]}</td>
                                        <td>{element[6]}</td>
                                        <td>{element[9]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <br />
                        {this.state.entries.length === 0 ? 
                            <Label for="catalogEntrySelect">No matching catalog entries found</Label>
                        :
                            <React.Fragment>
                                <Label for="catalogEntrySelect">Select entry:</Label>
                                <Input type="select" id="catalogEntrySelect" onChange={this.onSelectCatalogEntry} value={this.state.entry}>
                                    {this.state.entries.length === 0 ? <option>None</option> : '' || this.state.entries.map((element, index) => (
                                        <option key={index} value={index}>{element[0]}</option>
                                    ))}
                                </Input>
                            </React.Fragment>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button color="primary" onClick={this.onSelect}>Select</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectCatalog);