import flowchart from 'flowchart.js';
import { htmlDecode, loadFile} from './util';

const SQUENCE_PATH = [
  '//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js',
  '//cdn.bootcss.com/raphael/2.2.1/raphael.min.js',
  '//cdn.bootcss.com/js-sequence-diagrams/1.0.6/sequence-diagram-min.js'
]

const loadFiles = function(files) {
  return files.reduce((sequence, file) => {
    return sequence.then(function() {
      return loadFile(file, 'js', true);
    })
  }, Promise.resolve())
}

function parseGraph(element, index, type) {
  let diagram;
  if (type === 'seq') {
    loadFiles(SQUENCE_PATH).then(() => {
      diagram = Diagram.parse(htmlDecode(element.innerHTML));
      drawGraph(element, index, type, diagram);
    })
  } else { // flow
    diagram = flowchart.parse(htmlDecode(element.innerHTML));
    drawGraph(element, index, type, diagram);
  }
}

function drawGraph(element, index, type, diagram) {
  var canvas = document.createElement('div');
  canvas.setAttribute("id", type + index);
  element.innerHTML = '';
  element.appendChild(canvas)
  diagram.drawSVG(type + index, {theme: 'simple'});
}

export function setGraph() {
  const seqs = document.getElementsByClassName('seq');
  Array.prototype.forEach.call(seqs, function( element, index ) {
    parseGraph(element, index, 'seq');
  });

  const flows = document.getElementsByClassName('flow');
  Array.prototype.forEach.call(flows, function( element, index ) {
    parseGraph(element, index, 'flow');
  });
}


