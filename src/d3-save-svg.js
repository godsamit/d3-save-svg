import download from './download';
import preprocess from './preprocess';

export function save(svgElement, config) {
  if (svgElement.nodeName !== 'svg' || svgElement.nodeType !== 1) {
    throw 'Need an svg element input';
  }

  var config = config || {};
  var svgInfo = preprocess(svgElement, config);
  var defaultFileName = getDefaultFileName(svgInfo);
  var filename = config.filename || defaultFileName;
  var svgInfo = preprocess(svgElement);
  download(svgInfo, filename);
}

function getDefaultFileName(svgInfo) {
  var defaultFileName = 'untitled';
  if (svgInfo.id) {
    defaultFileName = svgInfo.id;
  } else if (svgInfo.class) {
    defaultFileName = svgInfo.class;
  } else if (window.document.title) {
    defaultFileName = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

  return defaultFileName;
}
