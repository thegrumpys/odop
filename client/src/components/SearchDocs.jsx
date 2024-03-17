import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Form, Button, Modal } from 'react-bootstrap';
import { logUsage } from '../logUsage';
import { displayMessage } from './Message';
import { displaySpinner } from './Spinner';

export default function SearchDocs() {
//  console.log("SearchDocs - Mounting...");
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = (event) => {
//        console.log("In SearchDocs.onChange event=",event);
    setText(event.target.value);
  }

  const onKeyPress = (event) => {
//        console.log("In SearchDocs.onKeyPress event=",event);
    if (event.charCode === 13) {
      onButtonPress(event);
    }
  }

  const onButtonPress = (event) => {
//        console.log("In SearchDocs.onButtonPress event=",event);
    var local_text = text;
    var encoded_text = encodeURIComponent(text);
//        console.log("In SearchDocs.onButtonPress encoded_text=",encoded_text);
    logUsage('event', 'SearchDocs', { event_label: text });
    setText('');
    setQuery(local_text);
    displaySpinner(true);
    fetch('/api/v1/search?terms=' + encoded_text)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((results) => {
//            console.log('In SearchDocs.onButtonPress results=', results);
//            results.forEach((element) => console.log('element.href=',element.href));
        setShow(!show);
        setResults(results);
      })
      .catch(error => {
        displayMessage('GET of search \'' + text + '\' failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
        displaySpinner(false);
      });
  }

  const onContextHelp = () => {
//        console.log('In SearchDocs.onContextHelp');
    setShow(!show);
    window.open('/docs/Help/helpLookup.html', '_blank');
  }

  const onCancel = (event) => {
//        console.log("In SearchDocs.onCancel event=",event);
    setShow(!show);
    // Noop - all done
  }

  return (
    <>
      <InputGroup className='pe-3'>
        <Form.Control type="text" value={text} placeholder="Help lookup" onChange={onChange} onKeyPress={onKeyPress} />
        <Button onClick={onButtonPress} style={{ padding: '0px 24px 16px 8px' }} disabled={text.length === 0}><i className="fas fa-search"></i></Button>
      </InputGroup>
      <Modal show={show} size="xl" onHide={onCancel}>'
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; Help lookup for terms '{query}'
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Found {results.length} matching documents</p>
          <ul>
            {results !== undefined && results.map((element) =>
              <li key={element.href}>
                <a href={'/docs/' + element.href + '?highlights=' + JSON.stringify(element.highlight_text)} target='_blank' rel="noopener noreferrer"><b>{element.title}</b></a>
                <div className="content" dangerouslySetInnerHTML={{ __html: element.sentence_text }}></div>
              </li>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={onContextHelp}>Help</Button>{' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
