import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './rich-text-editor.styl'

export default class RichTextEditor extends Component {
  
  constructor(props){
    super(props)
    const {detail} = this.props;
    
    if (detail ) {
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      }
    } else {
        const editorState=EditorState.createEmpty();
        this.state = {
            editorState
          }  

    }
  }
  componentDidMount(){
    //如果不为空，需要设置编辑器为原来的内容
    // const {detail} = this.props;
    // console.log(detail)
    // const contentBlock = htmlToDraft(detail)
    // if (contentBlock) {
    //         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    //         const editorState = EditorState.createWithContent(contentState);
    //         this.state = {
    //           editorState,
    //         };
    // }

   

    
  }

  onEditorStateChange=(editorState) => {
    this.setState({
      editorState,
    });
    const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.props.getEditorText(value)
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}