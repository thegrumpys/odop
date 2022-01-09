import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../store/actionTypes';
import { seek, saveAutoSave, restoreAutoSave } from '../store/actionCreators';

class MinMaxSeekView extends Component {
    
    render() {
        console.log('In MinMaxSeekView.render this=',this);
        this.props.saveAutoSave();
        var names = this.props.symbol_table.map(
            element => 
            {
                console.log('element.name=',element.name,'element=',element);
                var value = element.value;
                var min = 0;
                var max = Infinity;
                if (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) {
                    this.props.seek(element.name, MIN);
                    min = element.value;
                    this.props.restoreAutoSave();
                    this.props.seek(element.name, MAX);
                    max = element.value;
                    this.props.restoreAutoSave();
                    console.log('min=',min,'max=',max);
                }
                return {name: element.name, value: value, min: min, max: max};
            }
        );
        console.log('names=',names);
        return (
            <>
                <table className="report-table-borders">
                    <thead>
                        <tr key="table-head-row">
                            <th>Name</th>
                            <th>Value</th>
                            <th>Min</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        {names.map((element) => {
                            return (
                                <tr key={element.name}>
                                    <td>{element.name}</td>
                                    <td>{element.value}</td>
                                    <td>{element.min}</td>
                                    <td>{element.max}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
           </>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

const mapDispatchToProps = {
    seek: seek,
    restoreAutoSave: restoreAutoSave,
    saveAutoSave: saveAutoSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(MinMaxSeekView);
