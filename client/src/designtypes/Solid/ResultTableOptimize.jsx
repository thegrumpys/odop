import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import * as sto from './symbol_table_offsets';

export class ResultTableOptimize extends Component {

    constructor(props) {
//        console.log('In ResultTableOptimize.constructor props=',props);
        super(props);
        this.onOptimizeSeekMAXVolume = this.onOptimizeSeekMAXVolume.bind(this);
        this.onOptimizeSeekMAXWeight = this.onOptimizeSeekMAXWeight.bind(this);
        this.onOptimizeSeekMINLength = this.onOptimizeSeekMINLength.bind(this);
        this.onOptimizeSeekMINWidth = this.onOptimizeSeekMINWidth.bind(this);
        this.onOptimizeSeekMINHeight = this.onOptimizeSeekMINHeight.bind(this);
    }

    onOptimizeSeekMAXVolume(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXVolume this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Volume button' });
        this.props.saveAutoSave();
        this.props.seek('Volume', MAX);
        this.props.onClick(event);
    }

    onOptimizeSeekMAXWeight(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXWeight this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MAX Weight button' });
        this.props.saveAutoSave();
        this.props.seek('Weight', MAX);
        this.props.onClick(event);
    }

    onOptimizeSeekMINLength(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINLength this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Length button' });
        this.props.saveAutoSave();
        this.props.seek('Length', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMINWidth(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWidth this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Width button' });
        this.props.saveAutoSave();
        this.props.seek('Width', MIN);
        this.props.onClick(event);
    }

    onOptimizeSeekMINHeight(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINWidth this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { event_label: 'optimize Seek MIN Height button' });
        this.props.saveAutoSave();
        this.props.seek('Height', MIN);
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
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Volume].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXVolume}>Seek MAX Volume</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Weight].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMAXWeight}>Seek MAX Weight</Button>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Length].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINLength}>Seek MIN Length</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Width].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINWidth}>Seek MIN Width</Button>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" disabled={this.props.symbol_table[sto.Height].lmin & FIXED ? true : false} onClick={this.onOptimizeSeekMINHeight}>Seek MIN Height</Button>
                            </td>
                            <td width="50%">
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
