import React, {Component} from "react";
import Book from "./Book";
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";


class SearchBook extends Component {
    state = {
        query: ''
    };

    componentDidMount() {
        this.props.clearSearchResults()
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        if (query) {
            BooksAPI.search(query)
                .then(books => {
                    if ('error' in books) {
                        this.props.clearSearchResults();
                    } else {
                        this.props.updateSearchResults(books);
                    }
                });
        } else {
            this.props.clearSearchResults();
        }
    }

    render() {
        const {query} = this.state;
        const {searchResults} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                               onChange={e => this.updateQuery(e.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults && searchResults.map(book =>
                            <li key={book.id}><Book book={book} moveToShelf={this.props.moveToShelf}/>
                        </li>)}
                    </ol>
                </div>
            </div>
        );
    }
}


export default SearchBook;
