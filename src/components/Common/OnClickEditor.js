import React from 'react';

import { IconContext } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";

export class OnClickEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            content: this.props.initialData,
            changed: true,
            largeContent: false,
            editing: false
        }

        this.textInput = React.createRef();

        this.enableEditor = this.enableEditor.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    componentDidMount () {
        this.updateLargeContentState();
    }

    enableEditor () {
        this.setState(previousState => ({editing: !previousState.editing}), () => {
            this.textInput.current.focus();
        });
    }

    handleOnChange (event) {
        this.setState({changed: true, content: event.target.value})
    }

    handleOnBlur (event) {
        const data = event.target.value;
        this.setState({editing: false, content: data});
        this.props.saveHandler(data)
        this.updateLargeContentState();
    }

    updateLargeContentState () {
        const threshold = 50;
        if (this.state.largeContent && this.state.content.length <= threshold) {
            this.setState({largeContent: false})
        } else if (!this.state.largeContent && this.state.content.length > threshold) {
            this.setState({largeContent: true})
        }
    }

    render () {
        return (
            <>
                {this.state.editing
                    ? <form>
                        <div className="row">
                            <div className="col-11">
                                {this.state.largeContent 
                                    ? <textarea
                                        ref={this.textInput}
                                        type="text"
                                        value={this.state.content}
                                        onChange={this.handleOnChange}
                                        onBlur={this.handleOnBlur}
                                        className="form-control"
                                    />
                                    : <input
                                        ref={this.textInput}
                                        type="text"
                                        value={this.state.content}
                                        onChange={this.handleOnChange}
                                        onBlur={this.handleOnBlur}
                                        className="form-control"
                                    />
                                }
                            </div>
                            <div className="col-1 p-0">
                                <button className="btn btn-success">
                                    <IconContext.Provider value={{ size: "1.5em"}}>
                                        <AiFillCheckCircle />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </div>
                    </form>
                    : <div onClick={this.enableEditor} className="bg-white p-2">
                        {this.state.content !== '' ? this.state.content : <i>No content</i>}
                    </div>
                }
            </>
        )
    }
}
