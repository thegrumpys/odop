import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

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

