import React from 'react';

import { connect } from 'react-redux';
import { RichTextEditor } from '../Common';


class TMChangesSummary extends React.Component {
    constructor (props) {
        super(props)
        this.updateText = this.updateText.bind(this);
    }

    updateText () {
        console.log('updated');
    }

    render () {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <h2>Changes summary</h2>
                    </div>
                </div>
                <div className="col-11">
                    <RichTextEditor 
                        saveHandler={this.updateText}
                        initialData={"hallo"}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TMChangesSummary);
