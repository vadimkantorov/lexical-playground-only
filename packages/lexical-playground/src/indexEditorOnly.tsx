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

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {LexicalComposer} from '@lexical/react/LexicalComposer';

import EditorOnly from './EditorOnly';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import {TableContext} from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';


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

function AppEditorOnly(): JSX.Element {
  const initialConfig = {
    editorState: null, // undefined?
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
        <TableContext>
            <div className="editor-shell">
              <EditorOnly showTreeView={false} showActions={false} />
            </div>
        </TableContext>
    </LexicalComposer>
  );
}


window.LexicalMarkdownEditor = query_selector =>
{
    const root = createRoot(document.querySelector(query_selector) as HTMLElement);
    const app = React.createElement(AppEditorOnly);
    root.render(app);
    return app;
}

window.LexicalMarkdownEditor_getEditor = () => 
{
    const [editor] = useLexicalComposerContext(); 
    return editor;
}
