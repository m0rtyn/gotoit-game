import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';

//import $ from "jquery";
//window.jQuery = jQuery = window.$ = $;
//console.log($);

// theAdmin theme =============================
import './assets/css/core.min.css';
import './assets/css/app.min.css';
import './assets/css/style.min.css';
// import './assets/js/core.min.js';
// import './assets/js/app.min.js';
// import './assets/js/script.min.js';
// ============================================

import './assets/vendor/toastr/toastr.css';
import './assets/vendor/animate/animate.css';
import './assets/vendor/bootstrap-slider/bootstrap-slider.css';

import App from './App';


ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
