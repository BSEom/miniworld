import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import './PhotoPage.css';

const PhotoPage = () => {
  const editorRef = useRef();
  const [md, setMd] = useState('');

  const onChange = () => {
    const inst = editorRef.current.getInstance();
    setMd(inst.getMarkdown());
  };

  return (
    <div className="photo-page">


      <div className="content">
        <Editor
          ref={editorRef}
          initialValue="여기에 글을 작성해 보세요."
          previewStyle="vertical"
          height="100%"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          onChange={onChange}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'link'],
            ['quote', 'code', 'image']
          ]}
        />
      </div>
    </div>
  );
};

export default PhotoPage;
