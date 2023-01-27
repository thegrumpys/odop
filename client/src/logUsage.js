import { displayMessage } from './components/MessageModal';

var lastName = '';
var lastValue = '';
var lastSuffix = '';
var buffer = '';
var sequence = 0;

function logIt(tag, action, note) {
//  console.log('In logIt tag=',tag,'action=',action,'note=',note);
  var body = JSON.stringify({tag: tag, action: action, note: note});
//  console.log('body=',body);
  fetch('/api/v1/usage_log', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: body
  })
  .then(res => {
//      console.log('res=',res);
      if (!res.ok) {
          throw Error(res.statusText);
      }
      return res.json()
  })
  .catch(error => {
//      console.log('error=',error);
      displayMessage('POST of usage_log of note \''+note+'\' failed with message: \''+error.message+'\'');
  });
}

function flushValue() {
//    console.log('In flushValue lastName=',lastName,'lastValue=',lastValue,'lastSuffix=',lastSuffix);
    if (lastName !== '') {
        if (buffer !== '') {
            buffer += '\n';
        }
        buffer += lastName;
        if (lastSuffix !== '') {
            buffer += '(' + lastSuffix + ')';
        }
        buffer += '=' + lastValue.toString();
        lastName = '';
        lastValue = '';
        lastSuffix = '';
    }
}

function flushBuffer() {
//    console.log('In flushBuffer buffer=',buffer);
    flushValue();
    if (buffer !== '') {
        var tag = 'event';
        var action = 'Values';
        var sequenced_note = {event_value: sequence++, event_label: buffer};
        if (process.env.NODE_ENV === 'production') { // Limit G.A. tracking to production
            window.gtag(tag, action, sequenced_note); // Output to Google Analytics
        }
        logIt(tag, action, sequenced_note);
        buffer = '';
    }
}

export function logValue(name,value,suffix='',merge=true) {
//    console.log('In logValue name=',name,'value=',value,'suffix=',suffix);
    if (name === lastName && suffix === lastSuffix && merge === true) {
        lastValue = value;
    } else {
        flushValue(); // Flush the last name & value
        lastName = name; // Set the new name & value
        lastValue = value;
        lastSuffix = suffix;
    }
}

export function logUsage(tag, action, note) {
//    console.log('In logUsage tag=',tag,'action=',action,'note=',note);
//     flushBuffer();
//     var sequenced_note = Object.assign({event_value: sequence++}, note);
//     if (process.env.NODE_ENV === 'production') { // Limit G.A. tracking to production
//         window.gtag(tag, action, sequenced_note); // Output to Google Analytics
//     }
//     logIt(tag, action, sequenced_note);
}