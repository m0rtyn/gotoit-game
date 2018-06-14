import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';

//import $ from "jquery";
//window.jQuery = jQuery = window.$ = $;
//console.log($);

import './bootstrap/css/bootstrap.min.css'; //TODO: bug with black screen instead all modal windows //.modal-backdrop

// theAdmin theme =============================
// import './theme/src/assets/css/style.min.css';
// import './theme/src/assets/css/core.min.css'; //TODO: bug with black screen instead all modal windows
import './theme/src/assets/css/app.min.css'; //.dialog-backdrop
// ============================================

import App from './App';
import './css/index.css';


ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
