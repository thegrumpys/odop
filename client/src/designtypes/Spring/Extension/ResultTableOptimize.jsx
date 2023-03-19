import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../../store/actionTypes';
import { seek, saveAutoSave } from '../../../store/actionCreators';
import { logUsage } from '../../../logUsage';
import * as sto from './symbol_table_offsets';

export class ResultTableOptimize extends Component {

    constructor(props) {
//        console.log('In ResultTableOptimize.constructor props=',props);
        super(props);
        this.onOptimizeSeekMINWeight = this.onOptimizeSeekMINWeight.bind(this);
        this.onOptimizeSeekMAXCycle_Life = this.onOptimizeSeekMAXCycle_Life.bind(this);
        this.onOptimizeSeekMINRate = this.onOptimizeSeekMINRate.bind(this);
        this.onOptimizeSeekMAXL_Stroke = this.onOptimizeSeekMAXL_Stroke.bind(this);
    }

    onOptimizeSeekMINWeight(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWeight this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Weight button' });
        this.props.saveAutoSave();
        this.props.seek('Weight', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMAXCycle_Life(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXCycle_Life this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Cycle_Life button' });
        this.props.saveAutoSave();
        this.props.seek('Cycle_Life', MAX);
        this.props.onClick(event);
    }

    onOptimizeSeekMINRate(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINRate this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Rate button' });
        this.props.saveAutoSave();
        this.props.seek('Rate', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMAXL_Stroke(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXL_Stroke this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX L_Stroke button' });
        this.props.saveAutoSave();
        this.props.seek('L_Stroke', MAX);
        this.props.onClick(event);
    }

    render() {
//        console.log('In ResultTableOptimize.render this=',this);
        return (
            <>
                <p>Select a pre-configured Seek optimization:</p>
                <Table borderless="true" size="sm">
                    <tbody>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Weight].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINWeight}>Seek MIN Weight</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Cycle_Life].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXCycle_Life}>Seek MAX Cycle_Life</Button>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Rate].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINRate}>Seek MIN Rate</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.L_Stroke].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXL_Stroke}>Seek MAX L_Stroke</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
});

const mapDispatchToProps = {
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTableOptimize);
