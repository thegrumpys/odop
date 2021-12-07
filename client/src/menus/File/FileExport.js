import React, { Component } from 'react';
import { Button, Modal, NavDropdown, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class FileExport extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.toggle = this.toggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onExport = this.onExport.bind(this);
        this.state = {
            modal: false,
            filetype: "json",
        };
    }

    toggle() {
        console.log('In FileExport.toggle');
        this.setState({
            modal: !this.state.modal, // Display Modal
        });
    }

    onSelect(event) {
        console.log('In FileExport.onSelect event.target.value=',event.target.value);
        this.setState({
            filetype: event.target.value,
        });
    }

    onCancel() {
        console.log('In FileExport.onCancel');
        this.setState({
            modal: !this.state.modal
        });
    }

    onExport() {
        console.log('In FileExport.onExport this.props.type=',this.props.type,' this.props.name=',this.props.name);
        var ordered = this.props.model;
        console.log('In FileExport.onExport ordered=',ordered);
// I created a special modified version of File Export which outputs a JSON file
// with all properties sorted in alphabetical order.
// It makes it easy to compare/diff two files and find the differences.
// However, the resulting JSON file CANNOT be File Imported.
// UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW
//      var ordered = sort(this.props.model);
//      function sort(object){
//          if (typeof object == "object") {
//              var keys = Object.keys(object);
//              keys.sort();
//              var newObject = {};
//              for (var i = 0; i < keys.length; i++){
//                  newObject[keys[i]] = sort(object[keys[i]])
//              }
//              return newObject;
//          } else if (object instanceof Array) {
//              var newObject = new Array();
//              for (var i = 0; i < object.length; i++){
//                  newObject.push(sort(object[i]));
//              }
//              return newObject;
//          } else {
//              return object;
//          }
//      }
// UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE UNCOMMENT ABOVE
        let url;
        switch (this.state.filetype) {
            default:
            case "json":
                url = window.URL.createObjectURL(new Blob([JSON.stringify(ordered, null, 2)]));
                console.log('In FileExport.exportDesign url=', url);
                break;
            case "csv":
                url = window.URL.createObjectURL(new Blob(ordered.symbol_table.map(entry => entry.name+"\t"+entry.value+"\n")));
                console.log('In FileExport.exportDesign url=', url);
                break;
        }
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.props.name + '.' + this.state.filetype);
        console.log('In FileExport.exportDesign link=', link);
        document.body.appendChild(link);
        link.click();
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'FileExport', { 'event_label': this.props.type + ' ' + this.props.name });
    }

    render() {
        console.log('In FileExport.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Export
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; File : Export
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control as="select" value="json" onChange={this.onSelect}>
                            <option key="json" value="json">JSON</option>
                            <option key="csv" value="csv">CSV</option>
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onExport}>Export</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.model.type,
    model: state.model
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileExport);

