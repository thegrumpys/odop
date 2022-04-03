import React, { Component } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

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
        console.log("In SearchDocs.onChange event=",event);
        this.setState({
            text: event.target.value,
        });
    }

    onKeyPress(event) {
        console.log("In SearchDocs.onKeyPress event=",event);
        if (event.charCode === 13) {
            this.onButtonPress(event);
        }
    }
    
    onButtonPress(event) {
        console.log("In SearchDocs.onButtonPress event=",event);
        var encoded_text = encodeURIComponent(this.state.text);
        console.log("In SearchDocs.onButtonPress encoded_text=",encoded_text);
        var encoded_site = encodeURIComponent('http://springdesignsoftware.org');
        console.log("In SearchDocs.onButtonPress encoded_site=",encoded_site);
        var url = 'http://google.com/search?q=' + encoded_text + '&at_sitesearch=' + encoded_site;
        console.log("In SearchDocs.onButtonPress url=",url);
        window.open(url, '_blank')
        this.setState({
            text: '',
        });
    }

    render() {
        console.log('In SearchDocs.render this=',this);
        return (
            <InputGroup>
                <Form.Control type="text" placeholder="Full Text Search of Docs ..." onChange={this.onChange} onKeyPress={this.onKeyPress} />
                <Button><i class="fas fa-search"></i></Button>
            </InputGroup>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SearchDocs);
