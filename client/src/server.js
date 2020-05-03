//const fetch = require('node-fetch');

export function getDesigns(user, type) {
  // Get the names and store them in state
//  var url = 'http://localhost:5000/api/v1/designtypes/'+encodeURIComponent(type)+'/designs';
  var url = '/api/v1/designtypes/'+encodeURIComponent(type)+'/designs';
  return fetch(url, {
          headers: {
              Authorization: 'Bearer ' + user
          }
      })
      .then(res => {
          if (!res.ok) {
             throw Error(res.statusText);
          }
          return res.json()
      })
      .then(names => {
          return names;
      })
      .catch(error => {
          throw Error('GET of design names failed with message: \''+error.message+'\'');
      });
}