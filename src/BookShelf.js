import React, {Component} from "react";
import Book from "./Book";


class BookShelf extends Component {
    render() {
        const {books, moveToShelf} = this.props
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books && books.map(book => <li key={book.id}><Book book={book} moveToShelf={moveToShelf}/></li>)}
                </ol>
            </div>
        );
    }
}


export default BookShelf;