export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
}

export function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

export function get(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    var jsonValidate = function(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (err) {
        return false;
      }
    };
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        const response = jsonValidate(this.response) ? JSON.parse(this.response) : this.response;
        return resolve(response);
      } else {
        return reject('error');
      }
    };
    request.onerror = function() {
      return reject('error');
    };
    request.send();
  })
}

export function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

// thanks to https://gist.github.com/dperini/ac3d921d6a08f10fd10e
export function getScrollingElement() {
  let d = document;
  return  d.documentElement.scrollHeight > d.body.scrollHeight &&
    d.compatMode.indexOf('CSS1') === 0 ?
    d.documentElement :
    d.body;
}

export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g,"");
}
