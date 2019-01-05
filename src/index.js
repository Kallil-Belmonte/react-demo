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
import './index.scss';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
