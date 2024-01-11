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

/*
class AppEditorOnly extends React.Component
{
    constructor()
    {
        super();
        this.myRef = React.createRef();
    }

    componentDidMount()
    {
       console.log('window.LexicalMarkdownEditor3', this.myRef);
    }

    render()
    {
        return <LexicalComposer initialConfig={this.props.initialConfig} ref={this.myRef}>
            <TableContext>
                <div className="editor-shell">
                    <EditorOnly showTreeView={false} showActions={false} />
                </div>
                <GetLexicalComposerContext />
            </TableContext>
        </LexicalComposer>
    }
}*/

window.LexicalMarkdownEditor = query_selector =>
{
    const root = createRoot(document.querySelector(query_selector) as HTMLElement);

    const initialConfig = {
        editorState: null, // undefined?
        //editorState: () => {
        //  $convertFromMarkdownString(markdown, TRANSFORMERS);
        //},
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };
    
    let resolveEditor = null;
    const resultPromise = new Promise((resolve, reject) => {resolveEditor = resolve});
    const GetLexicalComposerContext = () =>
    {
        const [editor] = useLexicalComposerContext();
        resolveEditor(editor);
        return null;
    }

    root.render(
        <LexicalComposer initialConfig={initialConfig}>
            <TableContext>
                <div className="editor-shell">
                  <EditorOnly showTreeView={false} showActions={false} />
                </div>
            </TableContext>
            <GetLexicalComposerContext />
        </LexicalComposer>
    );
    
    return resultPromise;
}
