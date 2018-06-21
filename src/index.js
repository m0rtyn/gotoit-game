import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';

//import $ from "jquery";
//window.jQuery = jQuery = window.$ = $;
//console.log($);

// theAdmin theme =============================
import './libraries/theme/src/assets/css/core.min.css';
import './libraries/theme/src/assets/css/app.min.css';
import './libraries/theme/src/assets/css/style.min.css';
// ============================================

import './libraries/toastr/toastr.css';
import './libraries/animate/animate.css';
import './libraries/bootstrap-slider.css';

import App from './App';
import './css/index.css';


ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
