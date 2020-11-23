import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FEApp from './FEApp';

class FEAppWithRouter extends Component {
  render() {
//    console.log('In FEAppWithRouter.render this.props=',this.props);
    return (
      <Router>
        <FEApp/>
      </Router>
    );
  }
}

export default FEAppWithRouter;