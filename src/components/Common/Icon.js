import React from 'react';

import { IconContext } from "react-icons";


export class Icon extends React.Component {
    render () {
        return (
            <IconContext.Provider 
                value={{ 
                    size: "1.5em",
                    style: { verticalAlign: "middle" } 
                }}>
                <div className="centered-label">
                    {this.props.icon}
                </div>
            </IconContext.Provider>
        )}
}
