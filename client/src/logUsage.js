var lastName = '';
var lastValue = '';
var lastSuffix = '';
var buffer = '';
var sequence = 0;

import axios from './axiosConfig';

function logIt(tag, action, note) {
//  console.log('logIt tag=',tag,'action=',action,'note=',note);
  axios.post('/api/v1/usage_log', { tag: tag, action: action, note: note })
  .catch(error => {
//      console.log('error=',error);
    console.error('POST of usage_log of note \'' + JSON.stringify(note) + '\' failed with message: \'' + error.message + '\'');
  });
}

function flushValue() {
//    console.log('flushValue lastName=',lastName,'lastValue=',lastValue,'lastSuffix=',lastSuffix);
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
//    console.log('flushBuffer buffer=',buffer);
  flushValue();
  if (buffer !== '') {
    var tag = 'event';
    var action = 'Values';
    var sequenced_note = {
      event_value: sequence++, 
      event_datetime: new Date().toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: '3', hour12: false}), 
      event_label: buffer
    };
    if (process.env.NODE_ENV === 'production') { // Limit G.A. tracking to production
      window.gtag(tag, action, sequenced_note); // Output to Google Analytics
    }
    logIt(tag, action, sequenced_note);
    buffer = '';
  }
}

export function logValue(name, value, suffix = '', merge = true) {
//    console.log('logValue name=',name,'value=',value,'suffix=',suffix);
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
//  console.log('logUsage','tag=',tag,'action=',action,'note=',note);
  flushBuffer();
  var sequenced_note = Object.assign(
    {
      event_value: sequence++,
      event_datetime: new Date().toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: '3', hour12: false}), 
    }, 
    note
  );
  if (process.env.NODE_ENV === 'production') { // Limit G.A. tracking to production
    window.gtag(tag, action, sequenced_note); // Output to Google Analytics
  }
  logIt(tag, action, sequenced_note);
}