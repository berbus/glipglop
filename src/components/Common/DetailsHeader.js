import React from 'react';


export class DetailsHeader extends React.Component {
    render () {
        return (
            <div className="bg-light px-5 py-2 rounded">
                <div className="row my-3">
                    <h1>{this.props.title}</h1>
                </div>
                {this.props.children}
            </div>
        )}
}
