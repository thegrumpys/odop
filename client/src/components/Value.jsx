import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (Math.abs(value) < 10000.0 || Math.abs(value) >= 1000000.0) {
        if (value === Number.POSITIVE_INFINITY) {
            odopValue = value.toPrecision(4);
        } else if (value >= 1.7975e+308) {
            odopValue = "1.797e+308";
        } else if (value === Number.NEGATIVE_INFINITY) {
            odopValue = value.toPrecision(4);
        } else if (value <= -1.7975e+308) {
            odopValue = "-1.797e+308";
        } else {
            odopValue = value.toPrecision(4);
        }
    } else {
        odopValue = value.toFixed(0);
    }
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
                            <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className="text-right" value={this.props.value.toODOPPrecision()} />
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

