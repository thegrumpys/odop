/*
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withAuth } from '@okta/okta-react';

export default withAuth(class FEImplicitCallback extends Component {
  constructor(props) {
    super(props);
    console.log("In FEImplicitCallback.ctor props=",props);

    this.state = {
      authenticated: null,
      error: null
    };
  }

  componentDidMount() {
    console.log("In FEImplicitCallback.componentDidMount");
    this.props.auth.handleAuthentication()
    .then(() => this.setState({ authenticated: true }))
    .catch(err => this.setState({ authenticated: false, error: err.toString() }));
  }

  render() {
    console.log("In FEImplicitCallback.render");
    if (this.state.authenticated === null) {
      console.log("In FEImplicitCallback.render this.state.authenticated=",this.state.authenticated);
      return null;
    }

    const referrerKey = 'secureRouterReferrerPath';
    const location = JSON.parse(localStorage.getItem(referrerKey) || '{ "pathname": "/" }');
    localStorage.removeItem(referrerKey);

//    return this.state.authenticated ?
//      <Redirect to={location}/> :
//      <p>{this.state.error}</p>;
    if (this.state.authenticated) {
      console.log("In FEImplicitCallback.render Redirect");
      return (
        <Redirect to={location}/>
      );
    } else {
      console.log("In FEImplicitCallback.render this.state.error");
      return (
        <p>{this.state.error}</p>
      );
    }
  }
});
