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

class Computed_Value extends Component {
    
    constructor(props) {
//        console.log('In Computed_Value.constructor props=',props);
        super(props);
    }
    
    render() {
//        console.log('In Computed_Value.render this.props=', this.props);
        return (
            <React.Fragment>
                <td className="align-middle" className={this.props.className}>
                    <InputGroup>
                        <Form.Control type="number" disabled={true} className="text-right text-muted" value={this.props.value.toODOPPrecision()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Computed_Value);

