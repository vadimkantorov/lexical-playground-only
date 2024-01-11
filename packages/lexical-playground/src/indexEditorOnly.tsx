/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './setupEnv';
import './index.css';

import { createRoot } from 'react-dom/client';
import React, { createElement, forwardRef, useRef, useImperativeHandle } from 'react';

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { EditorSetOptions } from 'lexical/LexicalEditor';
import { EditorState, LexicalEditor } from 'lexical';

import EditorOnly from './EditorOnly';
import { TableContext } from './plugins/TablePlugin';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

declare global {
    interface Window {
        LexicalMarkdownEditor: (selector: string) => void;
    }
}


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
window.addEventListener('unhandledrejection', ({ reason }) =>
    showErrorOverlay(reason),
);

interface EditorMethods {
    getEditorState: () => EditorState | undefined;
    setEditorState: (editorState: EditorState, editorOptions?: EditorSetOptions) => void;
    setMarkdown: (markdown: string) => void;
}

const App = forwardRef<EditorMethods>(function App(_, ref): JSX.Element {
    const initialConfig: InitialConfigType = {
        editorState: null,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error
        },
        theme: PlaygroundEditorTheme,
    }

    const editorRef = useRef<LexicalEditor>(null)

    useImperativeHandle(ref, () => ({
        getEditorState(): EditorState | undefined {
            return editorRef.current?.getEditorState()
        },
        setEditorState(editorState: EditorState, editorOptions?: EditorSetOptions): void {
            editorRef.current?.setEditorState(editorState, editorOptions)
        },
        setMarkdown(markdown: string): void {
            editorRef.current?.update(() => {
                const editorState = editorRef.current?.getEditorState()
                if (editorState != null) {
                    $convertFromMarkdownString(markdown, TRANSFORMERS)
                }
            })
        }
    }))


    return (
        <LexicalComposer initialConfig={initialConfig}>
            <TableContext>
                <div className="editor-shell">
                    <EditorOnly showTreeView={false} showActions={false} />
                    <EditorRefPlugin editorRef={editorRef} />
                </div>
            </TableContext>

        </LexicalComposer>
    )
})

function createApp(selector: string): Promise<EditorMethods | null> {
    return new Promise((resolve) => {
        const root = createRoot(document.querySelector(selector) as HTMLElement)

        const app = createElement(App, {
            ref: resolve,
        })

        root.render(app)
    })
}

window.LexicalMarkdownEditor = createApp
