import React, { Component } from 'react';
import { Table  } from 'react-bootstrap';
import NameValueUnitsHeaderCalcInput from './NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import { connect } from 'react-redux';

class NameValueUnitsCalcInputTable extends Component {
    
    render() {
//        console.log('In NameValueUnitsTable.render this=',this);
        return (
            <>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <NameValueUnitsHeaderCalcInput />
                    {this.props.symbol_table.map((element,index) => element.type === "calcinput" && !element.hidden && <NameValueUnitsRowCalcInput key={element.name} element={element} index={index} />)}
                </Table>
            </>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls
});

export default connect(mapStateToProps)(NameValueUnitsCalcInputTable);
