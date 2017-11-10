// import React, { Component } from 'react';
// import { connect } from 'react-redux'

// import { search } from '../reducers/search.jsx';


// class SearchBar extends Component {
//     constructor() {
//         super()
//         this.state = {
//             value: '',
//             suggestions: [],
//             categories: []
//         }
//         this.updateSearch = this.updateSearch.bind(this);
//     }
//     updateSearch(event) {
//         console.log(event.target.value);
//     }

//     render() {
//         return (
//             <div>
//                 <input
//                     type="text"
//                     value={this.props.search.query}
//                     onChange={this.updateSearch} />
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         products: state.products,
//         search: state.search,
//         categories: state.categories
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         searchText(event) {
//             dispatch(search(event))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
