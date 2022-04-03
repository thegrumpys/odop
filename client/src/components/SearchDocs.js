import React, { Component } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../logUsage';

class SearchDocs extends Component {

    constructor(props) {
//        console.log("In SearchDocs.constructor props=",props);
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = {
            text: '',
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
        var encoded_text = encodeURIComponent(this.state.text+' site:http://odop.herokuapp.com/docs/');
//        console.log("In SearchDocs.onButtonPress encoded_text=",encoded_text);
        var url = 'http://google.com/search?q=' + encoded_text;
//        console.log("In SearchDocs.onButtonPress url=",url);
        logUsage('event', 'SearchDocs', { 'event_label': this.state.text});
        this.setState({
            text: '',
        });
        window.open(url, '_blank')
    }

    render() {
//        console.log('In SearchDocs.render this=',this);
        return (
            <InputGroup className='pr-3'>
                <Form.Control type="text" value={this.state.text} placeholder="Help lookup" onChange={this.onChange} onKeyPress={this.onKeyPress} />
                <Button onClick={this.onButtonPress} style={{padding: '0px 24px 16px 8px'}} disabled={this.state.text.length === 0}><i className="fas fa-search"></i></Button>
            </InputGroup>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SearchDocs);
