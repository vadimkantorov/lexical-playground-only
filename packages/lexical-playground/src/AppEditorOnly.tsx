/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import * as React from 'react';

import EditorOnly from './EditorOnly';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import {TableContext} from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

export default function AppEditorOnly(): JSX.Element {
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
