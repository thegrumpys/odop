import React, { Component } from 'react';
import { InputGroup, Form, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../logUsage';
import { displayMessage } from './MessageModal';
import { displaySpinner } from './Spinner';

class SearchDocs extends Component {

    constructor(props) {
//        console.log("In SearchDocs.constructor props=",props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            text: '',
            query: '',
            modal: false,
            results: [],
        };
    }
    
    onChange(event) {
//        console.log("In SearchDocs.onChange event=",event);
        this.setState({
            text: event.target.value,
        });
    }

    onKeyPress(event) {
//        console.log("In SearchDocs.onKeyPress event=",event);
        if (event.charCode === 13) {
            this.onButtonPress(event);
        }
    }
    
    onButtonPress(event) {
//        console.log("In SearchDocs.onButtonPress event=",event);
        var text = this.state.text;
        var encoded_text = encodeURIComponent(this.state.text);
//        console.log("In SearchDocs.onButtonPress encoded_text=",encoded_text);
        logUsage('event', 'SearchDocs', { event_label: this.state.text});
        this.setState({
            text: '',
            query: text,
        });
        displaySpinner(true);
        fetch('/api/v1/search?terms='+encoded_text)
        .then(res => {
            displaySpinner(false);
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json()
        })
        .then((results) => {
//            console.log('In SearchDocs.onButtonPress results=', results);
//            results.forEach((element) => console.log('element.href=',element.href));
            this.setState({
                modal: !this.state.modal,
                results: results,
            });
        })
        .catch(error => {
            displayMessage('GET of search \''+text+'\' failed with message: \''+error.message+'\'');
        });
    }

    onContextHelp() {
//        console.log('In SearchDocs.onContextHelp this=',this);
        this.setState({
            modal: !this.state.modal,
        });
        window.open('/docs/Help/helpLookup.html', '_blank');
    }

    onCancel(event) {
//        console.log("In SearchDocs.onCancel event=",event);
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In SearchDocs.render this=',this);
        return (
            <>
                <InputGroup className='pr-3'>
                    <Form.Control type="text" value={this.state.text} placeholder="Help lookup" onChange={this.onChange} onKeyPress={this.onKeyPress} />
                    <Button onClick={this.onButtonPress} style={{padding: '0px 24px 16px 8px'}} disabled={this.state.text.length === 0}><i className="fas fa-search"></i></Button>
                </InputGroup>
                <Modal show={this.state.modal} size="lg" onHide={this.onCancel}>'
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Help lookup for terms '{this.state.query}'
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Found {this.state.results.length} matching documents</p>
                        <ul>
                        {this.state.results !== undefined && this.state.results.map((element) => 
                            <li key={element.href}>
                                <a href={'/docs/' + element.href + '?highlights=' + JSON.stringify(element.highlight_text)} target='_blank' rel="noopener noreferrer"><b>{element.title}</b></a>
                                <div className="content" dangerouslySetInnerHTML={{__html: element.sentence_text}}></div>
                            </li>
                        )}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SearchDocs);
