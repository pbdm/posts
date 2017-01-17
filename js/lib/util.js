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
// TODO use document.scrollingElement?
// https://github.com/mathiasbynens/document.scrollingElement
export function getScrollingElement() {
  let d = document;
  return d.documentElement.scrollHeight > d.body.scrollHeight &&
    d.compatMode.indexOf('CSS1') === 0 ?
    d.documentElement :
    d.body;
}

export function delHtmlTag(str) {
  return str.replace(/<[^>]+>/g,"");
}

function getSingle(fn) {
  const result = {};
  return function() {
    const key = Array.prototype.join.call(arguments);
    if (!result[key]) {
      result[key] = fn.apply(this, arguments);
    }
    return result[key];
  }
}

// TODO add more attribute support
function loadjscssfile(filename, filetype = 'js') {
	return new Promise((resolve, reject) => {
    let fileref;
    if (filetype === "js") {
      fileref = document.createElement('script')
      fileref.setAttribute("type","text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype === "css") {
      fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    fileref.onload = resolve;
    fileref.onerror = reject;
    document.getElementsByTagName("head")[0].appendChild(fileref)
  })
}

const loadFileOnce = getSingle(loadjscssfile);

export function loadFile(filename, filetype = 'js', once) {
  arguments.length = arguments.length - 1;
  if (once) {
    return loadFileOnce.apply(this, arguments);
  } else {
    return loadjscssfile.apply(this, arguments);
  }
}
