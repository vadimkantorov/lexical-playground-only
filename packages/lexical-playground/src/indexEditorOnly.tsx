/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './setupEnv';
import './index.css';

import * as React from 'react';
import {createRoot} from 'react-dom/client';

import AppEditorOnly from './AppEditorOnly';

// Handle runtime errors
const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get('vite-error-overlay');
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({reason}) =>
  showErrorOverlay(reason),
);

//createRoot(document.getElementById('root') as HTMLElement).render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//);


window.LexicalMarkdownEditor = query_selector =>
{
    const root = createRoot(document.querySelector(query_selector) as HTMLElement);
    const app = React.createElement(AppEditorOnly);
    root.render(app);
    //root.render(<React.StrictMode><App /></React.StrictMode>);
    return app;
}
