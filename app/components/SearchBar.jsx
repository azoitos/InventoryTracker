import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: []
        }
    }
    onChange(evt, { newValue }) {
        evt.preventDefault();
        this.setState = {
            value: newValue
        }
    }
    render() {
        const { value, suggestions } = this.state
        const inputProps = {
            placeholder: 'Search here..',
            value,
            onChange: this.onChange
        }
        return (
            <Autosuggest
                suggestions={suggestions}
                inputProps={inputProps}
            />
        )
    }
}
export default SearchBar