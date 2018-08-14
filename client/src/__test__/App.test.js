import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { initialState } from '../problems/Piston-Cylinder/initialState';
import { initialSystemControls } from '../initialSystemControls';
import { UncontrolledDropdown, DropdownMenu } from 'reactstrap';
import App from '../components/App';
import ActionTrade from '../menus/action/ActionTrade';
import { startup, changeDesignParameterValue } from '../store/actionCreators';
import { reducers } from '../store/reducers';
import TestRenderer from 'react-test-renderer';

it('renders without crashing', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
            reducers,
            state
            );
    store.dispatch(startup());
    const div = document.createElement('div');
    div.setAttribute("id", "root");
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders with different design parameter and state variable constraint violations', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(
            reducers,
            state
            );
    store.dispatch(startup());
    const component = TestRenderer.create(
        <Provider store={store}><App /></Provider>,
        {
            createNodeMock: (element) => {
                console.log('@@@ element=',element);
                return null;
            }
        }
    );
    console.log('component=',component);
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
//    console.log('tree=',tree);
    
//    store.dispatch(changeDesignParameterValue("PRESSURE", 5000));
    let app = tree;
    console.log('app=',app);
    let navbar = app[0];
    console.log('navbar=',navbar);
//    let jumbotron = app[1];
//    console.log('jumbotron=',jumbotron);
//    let navbarbrand = navbar.children[0];
//    console.log('navbarbrand=',navbarbrand);
//    let navbartoggler = navbar.children[1];
//    console.log('navbartoggler=',navbartoggler);
    let collapse = navbar.children[2];
    console.log('collapse=',collapse);
    let nav = collapse.children[0];
    console.log('nav=',nav);
//    let uncrontrolleddropdownfile = nav.children[0];
//    console.log('uncrontrolleddropdownfile=',uncrontrolleddropdownfile);
//    let dropdowntoggle = uncrontrolleddropdownfile.children[0];
//    console.log('dropdowntoggle=',dropdowntoggle);
//    let dropdownmenu = uncrontrolleddropdownfile.children[1];
//    console.log('dropdownmenu=',dropdownmenu);
    let uncrontrolleddropdownaction = nav.children[1];
    console.log('uncrontrolleddropdownaction=',uncrontrolleddropdownaction);
    let dropdowntoggle = uncrontrolleddropdownaction.children[0];
    console.log('dropdowntoggle=',dropdowntoggle);
    let dropdownmenu = uncrontrolleddropdownaction.children[1];
    console.log('dropdownmenu=',dropdownmenu);
//    let uncrontrolleddropdownview = nav.children[2];
//    console.log('uncrontrolleddropdownview=',uncrontrolleddropdownview);
//    let dropdowntoggle = uncrontrolleddropdownview.children[0];
//    console.log('dropdowntoggle=',dropdowntoggle);
//    let dropdownmenu = uncrontrolleddropdownview.children[1];
//    console.log('dropdownmenu=',dropdownmenu);
    let dropdownitemtrade = dropdownmenu.children[2];
    console.log('dropdownitemtrade=',dropdownitemtrade);
    console.log('=====================================================================');
    
    dropdownitemtrade.props.onClick(dropdownitemtrade);
    
//    // re-rendering
//    tree = component.toJSON();
//    expect(tree).toMatchSnapshot();
//    console.log('tree2=',tree);
});
