import flowchart from 'flowchart.js';
import { htmlDecode } from './util';

function parseGraph(element, index, type) {
  var diagram;
  if (type === 'seq') {
    diagram = Diagram.parse(htmlDecode(element.innerHTML));
  } else { // flow
    diagram = flowchart.parse(htmlDecode(element.innerHTML));
  }
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


