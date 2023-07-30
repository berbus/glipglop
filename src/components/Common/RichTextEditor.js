import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { sanitize } from "isomorphic-dompurify";


export class RichTextEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            content: this.props.initialData,
            changed: true,
            editing: false
        }
        this.enableEditor = this.enableEditor.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    enableEditor () {
        this.setState({'editing': true})
    }

    handleOnChange (event, editor) {
        if (!this.state.changed) {
            this.setState({'changed': true})
        }

    }

    handleOnBlur (event, editor) {
        const data = editor.getData();
        this.setState({'editing': false, 'content': data});
        this.props.saveHandler(data, this.props.editorId)
    }

    render () {
        return (
            <>
                {this.state.editing
                    ?
                        <>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={this.state.content}
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                            />
                        </>
                        : 
                        <>
                            {this.state.content === ''
                                ? <div
                                    onClick={this.enableEditor} 
                                    className="bg-white p-2">
                                    <i>No content</i>
                                </div>
                                : <div 
                                    onClick={this.enableEditor} 
                                    className="bg-white p-2"
                                    dangerouslySetInnerHTML={{__html: sanitize(this.state.content)}}>
                                </div>
                            }
                        </>
                }
            </>
        )
    }
}
