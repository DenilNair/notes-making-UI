import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const Create = () => {
  const [editorState, setEditorState] = useState(
    () => {EditorState.createEmpty();console.log('in useState')}
  );
  let _contentState = ContentState.createFromText('Sample content state');
  const raw = convertToRaw(_contentState)
  const [contentState, setContentState] = useState(raw) // ContentState JSON

  
 function checkContent(){
     console.log(contentState);
 }


 
function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 035750f765a6563');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error)
        reject(error);
      });
    }
  );
}

  function submit(){
    let url = "http://localhost:10000/store-data";
    let data = contentState;

    fetch(url,{
        method:'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify(data)
    }).then((result)=>{
        result.json().then((res)=>{
            console.warn('res',res)
        })
    })
};

  return (
    <div className="App">
    <header className="App-header">
      Rich Text Editor Example
    </header>
    
    <button onClick={submit}>Submit</button>
    <Editor
      defaultContentState={contentState}
      onContentStateChange={setContentState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
      }}
    />

  </div>
  )
}
export default Create;