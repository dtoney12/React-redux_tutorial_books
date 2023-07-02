import BookShow from './BookShow';
import BooksContext from "../context/books";
import {useContext} from "react";

const BookList = () => {
    const {books} = useContext(BooksContext);
    const renderedBooks = books.map((book)=> {
        return <BookShow book={book} key={book.id}/>
    });

    return (
        <div className="book-list">
            {renderedBooks}
        </div>
    )
}

export default BookList;