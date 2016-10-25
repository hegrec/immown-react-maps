class API {
  _sendRequest(url, params, method = 'GET') {
    const httpRequest = new XMLHttpRequest();
    const queryString = this.buildQueryString(params);
    const promise = new Promise((resolve, reject) => {
      httpRequest.addEventListener('load', function() {
        resolve(JSON.parse(this.responseText));
      });

      httpRequest.addEventListener('error', function() {
        reject();
      });

      httpRequest.addEventListener('abort', function() {
        reject();
      });
    });

    promise._httpRequest = httpRequest;

    httpRequest.open(method, url + queryString);
    httpRequest.send();

    return promise;
  }

  buildQueryString(params) {
    const paramList = [];

    for (let param in params) {
      if (params.hasOwnProperty(param)) {
        paramList.push(`${param}=${params[param]}`);
      }
    }

    return `?${paramList.join('&')}`;
  }

  loadHomeSidebar(filters) {
    return this._sendRequest('/sidebar', filters);
  }

  loadHomeIcons(filters) {
    return this._sendRequest('/icons', filters);
  }
}


export default new API();
