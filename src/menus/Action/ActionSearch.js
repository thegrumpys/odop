import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { FIXED, DEL, DELMIN, OBJMIN, MAXIT, TOL } from '../../globals';
import { patsh } from '../../patsh';
import { changeDesignParameterValue, changeSearchResultsTerminationCondition } from '../../actionCreators';

class ActionSearch extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        // Compress P into PC
        var dp;
        var pc = [];
        for (let i = 0; i < this.props.state.design_parameters.length; i++) {
            dp = this.props.state.design_parameters[i];
            if (!(dp.lmin & FIXED)) {
                pc.push(dp.value);
            }
        }
        // Do the pattern search
        var delarg = DEL;
        var ncode = patsh(pc, delarg, DELMIN, OBJMIN, MAXIT, TOL, this.props.store, this.props.state, this.props.changeDesignParameterValue);
        // Expand PC back into store change actions
        var kd = 0;
        for (let i = 0; i < this.props.state.design_parameters.length; i++) {
            dp = this.props.state.design_parameters[i];
            if (!(dp.lmin & FIXED)) {
                this.props.changeDesignParameterValue(dp.name, pc[kd++]);
            }
        }
        this.props.changeSearchResultsTerminationCondition(ncode, 0);
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle}>
                    Search
                </DropdownItem>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    state: state,
});

const mapDispatchToProps = {
        changeDesignParameterValue: changeDesignParameterValue,
        changeSearchResultsTerminationCondition: changeSearchResultsTerminationCondition
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSearch);
