import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toODOPPrecision } from '../toODOPPrecision'

class Value extends Component {

    render() {
//        console.log('In Value.render');
        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        {typeof this.props.value === 'number' ?
                            <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className="text-right" value={toODOPPrecision(this.props.value)} />
                            :
                            <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className="text-right" value={this.props.value} />
                        }
                    </InputGroup>
                </td>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Value);

