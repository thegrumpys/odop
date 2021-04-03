import { displayMessage } from './components/MessageModal';

var buffer = '';

function logIt(tag, action, note) {
  var body = JSON.stringify({tag: tag, action: action, note: note});
//  console.log('body=',body);
  fetch('/api/v1/usage_log', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
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

export function logValue(name,value,suffix='') {
    if (buffer !== '') {
        buffer += '\n';
    }
    buffer += name;
    if (suffix !== '') {
        buffer += '(' + suffix + ')';        
    }
    buffer += '=' + value.toString();
}

export function logUsage(tag, action, note) {
//    console.log('In logUsage tag=',tag,'action=',action,'note=',note);
    if (process.env.NODE_ENV === "production") { // Limit G.A. tracking to production
        window.gtag(tag, action, note); // Output to Google Analytics
    }
    
    if (buffer !== '' ) {
        logIt('event', 'Buffer', buffer);
        buffer = '';
    }

    logIt(tag, action, note);
}