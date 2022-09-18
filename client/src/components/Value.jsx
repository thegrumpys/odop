import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import FormControlTypeNumber from './FormControlTypeNumber';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class Value extends Component {
    
    render() {
//        console.log('In Value.render this=',this);
        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        {typeof this.props.value === 'number' ?
                            (this.props.value !== Number.NEGATIVE_INFINITY && this.props.value !== Number.POSITIVE_INFINITY ? 
                                <FormControlTypeNumber id={'v_'+this.props.id} disabled={true} value={this.props.value} />
                                :
                                <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className="text-right" value={this.props.value.toFixed()} />
                            )
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
