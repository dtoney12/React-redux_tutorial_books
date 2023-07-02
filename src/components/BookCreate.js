import { useState} from "react";
import {useContext} from "react";
import BooksContext from "../context/books";

function BookCreate() {
    const { createBook } = useContext(BooksContext);

    const [title, setTitle] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        createBook(title);
        setTitle('');
    }

    function handleChange(event) {
        setTitle(event.target.value);
    }

    return (
        <div className="book-create">
            <form onSubmit={handleSubmit}>
                <h3>Add a Book</h3>
                <label>Title</label>
                <input className="input" value={title} onChange={handleChange} />
                <button className="button">Submit</button>
            </form>
        </div>)
}

export default BookCreate;