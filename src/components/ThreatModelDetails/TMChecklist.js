import React from 'react';

import { connect } from 'react-redux';
import { RichTextEditor } from '../Common';


class TMChecklist extends React.Component {
    constructor (props) {
        super(props)
        this.updateText = this.updateText.bind(this);
    }

    updateText (data, editorId) {
        console.log(editorId);
        console.log('updated');
    }

    render () {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h2>Threat model checklist</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h4>Business logic cases</h4>
                        <div className="row">
                            <div className="col">
                                <RichTextEditor 
                                    editorId={"y"}
                                    saveHandler={this.updateText}
                                    initialData={"hallo"}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Action items</h5>
                                <p>No action items.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h4>Boundary - Trust Zone</h4>
                        <div className="row">
                            <div className="col">
                                <RichTextEditor 
                                    editorId={"x"}
                                    saveHandler={this.updateText}
                                    initialData={"hallo"}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Action items</h5>
                                <p>No action items.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TMChecklist);
