import React from 'react';
import { Spinner } from './Spinner';
import { ErrorModal } from './ErrorModal';
import { PromptForDesign } from './PromptForDesign';

//export default () => <h3>Protected</h3>;

export default () => <div id="root2"><Spinner /><ErrorModal /><PromptForDesign /></div>;

//export default () {
//    ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><PromptForDesign /></div>, document.getElementById('root1'));
//}