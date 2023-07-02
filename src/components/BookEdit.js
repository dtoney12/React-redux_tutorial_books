import {useState} from 'react';

function BookEdit({onSubmit, title, id}) {
    const [newTitle, setNewTitle] = useState(title);

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(id, newTitle);
    }

    function handleChange(event) {
        setNewTitle(event.target.value);
    }

    return (
        <div className="book-edit">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value={newTitle} onChange={handleChange} />
                <button className="button is-primary">Save</button>
            </form>
        </div>)
}

export default BookEdit;
