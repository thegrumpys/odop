import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavDropdown, Modal, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';
import { search, saveAutoSave } from '../../store/modelSlice';
import { logUsage } from '../../logUsage';
import { displayMessage } from '../../components/Message';

class ActionSearch extends Component {

    constructor(props) {
//        console.log('In ActionSearch.constructor props=',props)
        super(props);
        this.onSearchRequest = this.onSearchRequest.bind(this);
        this.onSearchContextHelp = this.onSearchContextHelp.bind(this);
        this.onSearchContinue = this.onSearchContinue.bind(this);
        this.onSearchCancel = this.onSearchCancel.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.state = {
            search_infinite_modal: false,
        };
    }

    onSearchRequest(event) {
//        console.log('In ActionSearch.onSearchRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
            return;
        }
        var inverted_constraint = false;
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                inverted_constraint = true;
                displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
                return;
            }
        });
        if (inverted_constraint) {
            return;
        }
        if (!Number.isFinite(this.props.objective_value)) {
            this.setState({
                search_infinite_modal: !this.state.search_infinite_modal
            });
            return;
        }
        this.doSearch('FINITE');
    }

    onSearchContextHelp() {
//        console.log('In ActionSearch.onSearchContinue this=',this);
        window.open('/docs/Help/errors.html#objNotFinite', '_blank');
    }

    onSearchContinue() {
//        console.log('In ActionSearch.onSearchContinue');
        this.setState({
            search_infinite_modal: !this.state.search_infinite_modal
        });
        this.doSearch('NOT FINITE');
    }

    onSearchCancel() {
//        console.log('In ActionSearch.onSearchCancel');
        this.setState({
            search_infinite_modal: !this.state.search_infinite_modal
        });
        // Noop - all done
    }

    doSearch(type) {
//        console.log('In ActionSearch.doSearch');
        var old_objective_value = this.props.objective_value;
        this.props.saveAutoSave();
        this.props.search();
        const { store } = this.context;
        var design = store.getState().model;
        var new_objective_value = design.model.result.objective_value;
        logUsage('event', 'ActionSearch', { event_label: 'Type ' + type + ' ' + old_objective_value.toPrecision(4) + ' --> ' + new_objective_value.toPrecision(4)});
    }

    render() {
//        console.log('In ActionSearch.render this=',this);

        var display_search_button;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            display_search_button = true;
        } else {
            display_search_button = false;
        }

        return (
            <>
                <NavDropdown.Item onClick={this.onSearchRequest} disabled={!display_search_button}>
                    Search (solve)
                </NavDropdown.Item>
                <Modal show={this.state.search_infinite_modal} onHide={this.onSearchCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Search
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="warning">
                            <p>This design has numeric issues.
                            Some design variable values are causing the Objective Value to be infinite.</p>
                            <p>Continuing Search may not result in an improvement.</p>
                            <p>Canceling Search will allow you to examine the Alerts panel for invalid values and associated help.
                            Freeing one or more Independent Variables may result in an improvement.</p>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onSearchContextHelp}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onSearchContinue}>Continue</Button>
                        <Button variant="primary" onClick={this.onSearchCancel}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

ActionSearch.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    search: search,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSearch);
