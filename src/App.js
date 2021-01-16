import React from 'react'
import {Route, Switch} from 'react-router-dom';
import './App.css'
import SearchBook from "./SearchBook";
import Home from "./Home";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        books: [],
        searchResults: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.updateBooks(books);
            });
    }

    updateBooks = books => {
        this.setState({
            books: books.filter(book => book.imageLinks && book.authors)
        });
    }

    updateSearchResults = books => {
        books.forEach(book => {
            const b = this.state.books.find(b => b.id === book.id);
            if (b) {
                book.shelf = b.shelf;
            }
        });
        this.setState({
            searchResults: books.filter(book => book.imageLinks && book.authors)
        });
    }

    moveToShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(_ => {
            })
        let index = this.state.books.findIndex(b => b.id === book.id);
        if (index !== -1) {
            this.updateBooks([
                ...this.state.books.slice(0, index),
                Object.assign({}, this.state.books[index], {shelf}),
                ...this.state.books.slice(index + 1)
            ]);
        }

        index = this.state.searchResults.findIndex(b => b.id === book.id);
        if (index !== -1) {
            this.updateSearchResults([
                ...this.state.searchResults.slice(0, index),
                Object.assign({}, this.state.searchResults[index], {shelf}),
                ...this.state.searchResults.slice(index + 1)
            ]);
        }
    };

    clearBooks = () => {
        this.setState({books: []});
    };

    clearSearchResults = () => {
        this.setState({searchResults: []});
    };

    render() {
        const {books, searchResults} = this.state;

        return (
            <div className="app">
                <Switch>
                    <Route exact path='/' render={() => <Home books={books}
                                                              updateBooks={this.updateBooks}
                                                              moveToShelf={this.moveToShelf}/>}/>
                    <Route path='/search' render={() => <SearchBook searchResults={searchResults}
                                                                    updateSearchResults={this.updateSearchResults}
                                                                    moveToShelf={this.moveToShelf}
                                                                    clearSearchResults={this.clearSearchResults}/>}/>
                </Switch>
            </div>
        );
    }
}

export default BooksApp
