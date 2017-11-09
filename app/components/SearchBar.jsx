import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest';

import { search } from '../reducers/search.jsx';


class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: [],
            categories: []
        }
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let catArr = []
        this.props.categories.map((cat, idx) => {
            let tempProd = this.props.products.filter(prod => {
                if (prod.categories[0].name.includes(cat)) {
                    return prod.categories[0].name.includes(cat)
                }
            })

            catArr.push({
                title: { name: cat.name, id: cat.id },
                products: cat.products.filter(p => p.name.includes(inputValue)),
            })
        })
        this.setState({ categories: catArr })
        return catArr
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

    renderSuggestion(suggestion) {
        return (suggestion.title
            ?
            <Link to={`/category/${suggestion.title.id}`}><h4>{suggestion.title.name}</h4></Link>
            :
            <Link to={`/products/${suggestion.id}`}>
                <span> <img className="searchImg" src={suggestion.imageUrl} /></span><span className="productSearchName">{suggestion.name}</span>
                <span className="searchPrice">${suggestion.price}</span>
            </Link>
        )
    }

    renderSectionTitle(section) {
        return (<h1>{section.title}</h1>)
    }

    getSectionSuggestions(section) {
        return section.products
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
                multiSection={true}
                suggestions={suggestions}
                inputProps={inputProps}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                renderSuggestion={this.renderSuggestion}
                getSuggestionValue={this.getSuggestionValue}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        search: state.search,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchText(event) {
            dispatch(search(event))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
