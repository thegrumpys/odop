import React from 'react';
import { DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, OBJMIN }  from '../../globals';
import { changeSearchResultsFeasibility } from '../../actionCreators';

class ActionSearch extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        // DO THE SEARCH
        var output = '';
        if (this.props.state.search_results.objective_value > OBJMIN)
            output += 'NOT';
        else {
            var j = 0;
            for (let i = 0; i < this.props.state.design_parameters.length; i++) {
                var dp = this.props.state.design_parameters[i];
                if (dp.lmin & CONSTRAINED)
                    if (dp.vmin > 0.0)
                        j++;
                if (dp.lmax & CONSTRAINED)
                    if (dp.vmax > 0.0)
                        j++;
            }
            for (let i = 0; i < this.props.state.state_variables.length; i++) {
                var sv = this.props.state.state_variables[i];
                if (sv.lmin & CONSTRAINED)
                    if (sv.vmin > 0.0)
                        j++;
                if (sv.lmax & CONSTRAINED)
                    if (sv.vmax > 0.0)
                        j++;
            }
            if (j > 0)
                output += 'MARGINALLY';
        }
        output += ' FEASIBLE';
        this.props.changeSearchResultsFeasibility(output);
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
    state: state
});

const mapDispatchToProps = {
        changeSearchResultsFeasibility: changeSearchResultsFeasibility
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSearch);
