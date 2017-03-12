var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

function getDirTree(dir, list, exclude) {
  dir = path.normalize(dir);
  var obj;
  fs.readdirSync(dir).forEach(function(value) {
    if (value[0] !== '.' && value !== exclude) {
      var filePath = path.join(dir, value);
      if (fs.statSync(filePath).isDirectory()) {
        list[value] = {};
        getDirTree(filePath, list[value], exclude);
      } else {
        if (value.substr(-2, 2) === 'md') {
          obj = parseTree(filePath);
          if (!list.files) {
            list.files = [];
          }
          list.files.push(obj);
        }
      }
    }
  });
}

function parseTree(filepath) {
  var temp = filepath.split('/');
  var file = temp[temp.length - 1];
  var res = {
    date: file.substr(0, 10),
    fullpath: encodeURIComponent(filepath),
    path: encodeURIComponent(file.slice(11, -3).toLowerCase()),
    title: file.slice(11, -3)
  }
  return res;
}

var Plugin = function(options) {
  var dirTree = {};
  var output = {};
  getDirTree(options.path, dirTree, options.exclude);
  var key = options.key || 'pbdm';
  output[key] = JSON.stringify(dirTree);
  return new webpack.DefinePlugin(output);
}

// Plugin({
//   path: '../../posts'
// })

module.exports = Plugin;
