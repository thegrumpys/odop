import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX } from '../../store/actionTypes';
import { seek, saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import { displaySpinner } from '../../components/Spinner';

export class ResultTableOptimize extends Component {

    constructor(props) {
//        console.log('In ResultTableOptimize.ctor props=',props);
        super(props);
        this.onOptimizeSeekMAXFORCE = this.onOptimizeSeekMAXFORCE.bind(this);
        this.onOptimizeSeekMINRADIUS = this.onOptimizeSeekMINRADIUS.bind(this);
        this.onOptimizeSeekMINPRESSURE = this.onOptimizeSeekMINPRESSURE.bind(this);
        this.onOptimizeSeekMINSTRESS = this.onOptimizeSeekMINSTRESS.bind(this);
    }

    onOptimizeSeekMAXFORCE(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMAXFORCE this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { 'event_label': 'optimize Seek MAX FORCE button' });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('FORCE', MAX);
        displaySpinner(false);
        this.props.onClick(event);
    }

    onOptimizeSeekMINRADIUS(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINRADIUS this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { 'event_label': 'optimize Seek MIN RADIUS button' });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('RADIUS', MIN);
        displaySpinner(false);
        this.props.onClick(event);
    }

    onOptimizeSeekMINPRESSURE(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINPRESSURE this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { 'event_label': 'optimize Seek MIN PRESSURE button' });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('PRESSURE', MIN);
        displaySpinner(false);
        this.props.onClick(event);
    }

    onOptimizeSeekMINSTRESS(event) {
//        console.log('In ResultTableOptimize.onOptimizeSeekMINSTRESS this=',this,'event=',event);
        logUsage('event', 'ResultTableOptimize', { 'event_label': 'optimize Seek MIN STRESS button' });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('STRESS', MIN);
        displaySpinner(false);
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
                                <Button variant="primary" onClick={this.onOptimizeSeekMAXFORCE}>Seek MAX FORCE</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" onClick={this.onOptimizeSeekMINRADIUS}>Seek MIN RADIUS</Button>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <Button variant="primary" onClick={this.onOptimizeSeekMINPRESSURE}>Seek MIN PRESSURE</Button>
                            </td>
                            <td width="50%">
                                <Button variant="primary" onClick={this.onOptimizeSeekMINSTRESS}>Seek MIN STRESS</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTableOptimize);
