import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


export class DropdownSelect extends React.Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange (data) {
        const ev =  {
            target: {
                name: this.props.name,
                value: data.map(it => (it.value))
            }
        };
        this.props.handleChange(ev);
    }

    render() {

        return (
            <>
                <Select
                    components={animatedComponents}
                    className="basic-multi-single"
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={this.props.options}
                    onChange={this.handleChange}
                    isMulti
                />
            </>
        );
    }
}
