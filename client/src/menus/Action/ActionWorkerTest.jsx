import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { workerTest } from '../../store/actionCreators';

class ActionWorkerTest extends Component {

    constructor(props) {
        console.log('In ActionWorkerTest.constructor props=',props)
        super(props);
        this.onWorkerTestRequest = this.onWorkerTestRequest.bind(this);
    }

    onWorkerTestRequest(event) {
        console.log('In ActionWorkerTest.onWorkerTestRequest this=',this,'event=',event);
        this.props.workerTest();
    }

    render() {
        console.log('In ActionWorkerTest.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.onWorkerTestRequest}>
                    Worker Test
                </NavDropdown.Item>
            </>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    workerTest: workerTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionWorkerTest);
