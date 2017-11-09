import React, { Component } from 'react';
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest';

import { search } from '../reducers/search.jsx';


class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: []
        }
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    }

    onChange(evt, { newValue }) {
        evt.preventDefault();
        this.props.searchText(newValue)
    }

    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        })
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        })
    }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // // input value for every given suggestion.

    getSuggestionValue(suggestion) {
        return suggestion.name
    }

    // // Use your imagination to render suggestions.
    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.name}
            </div>
        )
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
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                renderSuggestion={this.renderSuggestion}
                getSuggestionValue={this.getSuggestionValue}
            />
        )
    }
}

function mapStateToProps(state) {
    return { products: state.products }
}

function mapDispatchToProps(dispatch) {
    return {
        searchText(event) {
            dispatch(search(event))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
