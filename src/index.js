import React from 'react';
import ReactDOM from 'react-dom';

//====================
// CSS
//====================
// FRAMEWORK: BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';

// PLUGIN: PRETTY CHECKBOX
import 'pretty-checkbox/dist/pretty-checkbox.min.css';


//====================
// JAVASCRIPT
//====================
// PLUGIN: JQUERY MASK
import 'jquery-mask-plugin/dist/jquery.mask.min.js';


//====================
// APP
//====================
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
