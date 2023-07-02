import BookEdit from './BookEdit';
import {useState} from "react";
import {useContext} from "react";
import BooksContext from "../context/books";

function BookShow({book}) {
    const {deleteBookById, editBook} = useContext(BooksContext);

    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        deleteBookById(book.id)
    }
    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = (id, title) => {
        editBook(id, title);
        setShowEdit(false);
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit} title={book.title} id={book.id}/>;
    }
    return <div className="book-show">
        <img
            alt="books"
            src={`https://picsum.photos/seed/${book.id}/200`}
        />
        {content}
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>
                Edit
            </button>
            <button className="delete" onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    </div>
}

export default BookShow;