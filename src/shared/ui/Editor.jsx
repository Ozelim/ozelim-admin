import React from 'react'
import { useEditor } from '@tiptap/react';

import { RichTextEditor, Link } from '@mantine/tiptap';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';

export const Editor = ({getHTML = () => {}}) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign
    ],
    content: '',
  });

  React.useEffect(() => {
    getHTML(editor?.getHTML())
  }, [editor?.state])

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content/>
    </RichTextEditor>  
  )
}