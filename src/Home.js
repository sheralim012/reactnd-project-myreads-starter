import React, {Component} from "react";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";


class Books extends Component {
    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.props.updateBooks(books);
            });
    }

    render() {
        const {books, moveToShelf} = this.props

        return (books &&
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            {<BookShelf
                                books={books && books.filter(book => book.shelf === 'currentlyReading')}
                                moveToShelf={moveToShelf}
                            />}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            {<BookShelf
                                books={books && books.filter(book => book.shelf === 'wantToRead')}
                                moveToShelf={moveToShelf}/>}
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            {<BookShelf books={books && books.filter(book => book.shelf === 'read')}
                                        moveToShelf={moveToShelf}/>}
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Search books</Link>
                </div>
            </div>
        );
    }
}


export default Books;