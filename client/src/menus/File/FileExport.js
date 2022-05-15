import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class FileExport extends Component {

    constructor(props) {
        super(props);
//        console.log("In FileSave.constructor props=",props);
        this.onExport = this.onExport.bind(this);
    }
    
    onExport() {
//      console.log('In FileExport.onExport this.props.type=',this.props.type,' this.props.name=',this.props.name);
      var ordered = this.props.state;
// I created a special modified version of File Export which outputs a JSON file 
// with all properties sorted in alphabetical order. 
// It makes it easy to compare/diff two files and find the differences. 
// However, the resulting JSON file CANNOT be File Imported.
// UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW UNCOMMENT BELOW 
//      var ordered = sort(this.props.state);
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
      const url = window.URL.createObjectURL(new Blob([JSON.stringify(ordered, null, 2)]));
//      console.log('In FileExport.exportDesign url=', url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', this.props.name + '.json');
//      console.log('In FileExport.exportDesign link=', link);
      document.body.appendChild(link);
      link.click();
      logUsage('event', 'FileExport', { event_label: this.props.type + ' ' + this.props.name });
  }
    
    render() {
//        console.log('In FileExport.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.onExport}>
                    Export
                </NavDropdown.Item>
            </>
        );
    }
}

const mapStateToProps = state => ({
    name: state.name,
    type: state.model.type,
    state: state.model
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileExport);

