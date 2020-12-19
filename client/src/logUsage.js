import { displayMessage } from './components/ErrorModal';

export function logUsage(tag, action, note) {
    if (process.env.NODE_ENV === "production") { // Limit G.A. tracking to production
        window.gtag(tag, action, note); // Output to Google Analytics
    }

    var body = JSON.stringify({tag: tag, action: action, note: note});
//    console.log('body=',body);
    fetch('/api/v1/usage_log', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then(res => {
//        console.log('res=',res);
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .catch(error => {
//        console.log('error=',error);
        displayMessage('POST of usage_log of note \''+note+'\' failed with message: \''+error.message+'\'');
    });
}