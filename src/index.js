import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';

// import jQuery from 'jquery';
// window.jQuery = jQuery = window.$ = $;
// console.log('wat', $);

// const themeCore = require('./assets/js/core.min.js');
// const themeApp = require('./assets/js/app.min.js');

// theAdmin theme =============================
// import './assets/styles/core.min.css';

// import './assets/js/core.min.js';
// import './assets/js/app.min.js';
// import './assets/js/script.min.js';
// ============================================

// jQuery( document ).ready(function() {
//   alert('stnstnstnstn');
// });

ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
