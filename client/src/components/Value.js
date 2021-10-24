import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toODOPPrecision } from '../toODOPPrecision';

class Value extends Component {
    
    render() {
//        console.log('In Value.render this=',this);
        return (
            <React.Fragment>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        {typeof this.props.value === 'number' ?
                            <Form.Control type="number" disabled={true} className="text-right text-value" value={this.props.value.toODOPPrecision()} />
                            :
                            <Form.Control type="text" disabled={true} className="text-right text-value" value={this.props.value} />
                        }
                    </InputGroup>
                </td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Value);

