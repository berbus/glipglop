import React from 'react';


class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            some_state_value: 0
        }
    }
    render() {
        return (
            <div>
            <label>Label: {this.props.value}</label><br/>
            <button className="square" onClick={() => {
                this.setState({"some_state_value": this.state.some_state_value +1})
            }}>
            Some test
            </button>
            <p>State: { this.state.some_state_value }</p>
            </div>
        );
    }
}

export default Square
