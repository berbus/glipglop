import React from 'react';

import { connect } from 'react-redux';


class TMDiagrams extends React.Component {
    render () {
        return (
            <>

                <div className="row">
                    <div className="col">
                        <h2>Changes diagrams</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Nothing uploaded yet.</p>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TMDiagrams);
