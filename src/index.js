import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';

//import $ from "jquery";
//window.jQuery = jQuery = window.$ = $;
//console.log($);

import App from './App';
import './css/index.css';

// theAdmin theme =============================
import './theme/src/assets/css/style.min.css';
import './theme/src/assets/css/core.min.css';
import './theme/src/assets/css/app.min.css';
// ============================================

ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
