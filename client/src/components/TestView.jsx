import React, { Component } from 'react';
import FormControlTypeNumber from './FormControlTypeNumber';
import { connect } from 'react-redux';

class TestView extends Component {

    render() {
//        console.log('In TestView.render this=',this);
        return (
            <>
                <FormControlTypeNumber id="test1" value={0.123}/>
                <FormControlTypeNumber id="test1" value={Number.NaN}/>
                <FormControlTypeNumber id="test2" value={Number.POSITIVE_INFINITY}/>
                <FormControlTypeNumber id="test3" value={Number.NEGATIVE_INFINITY}/>
                <FormControlTypeNumber id="test1" value={0.123} disabled={true} readOnly/>
                <FormControlTypeNumber id="test4" value={Number.NaN} disabled={true} readOnly/>
                <FormControlTypeNumber id="test5" value={Number.POSITIVE_INFINITY} disabled={true} readOnly/>
                <FormControlTypeNumber id="test6" value={Number.NEGATIVE_INFINITY} disabled={true} readOnly/>
            </>
        );
    }

}

export default connect()(TestView);
