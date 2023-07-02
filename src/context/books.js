/*

updatedBook spread operator ensures all updates from database are copied over to the local book state.

    const editBook = async (id, title)=> { ...
        return {...book, ...updatedBook};

-------------------------
useCallback() with empty 2nd argument returns a stable reference to the arrow function 1st argument.
Subsequent re-renders will continue to return a reference to that same function.
So, when useEffect in the App executes its callback including the fetchBooks function which in turn executes setBooks,
and books state updates in the Provider component causing it to re-render,
the callback function referenced by fetchBooks will remain unchanged.
Therefor useEffect will not detect that its reference to fetchBooks has changed, and will not execute the callback again.
In this way we can avoid continuous re-rendering of the Provider component (which would also re-render the child App)

    books.js:
        const fetchBooks = useCallback(async () => {
            const response = await axios.get('http://localhost:3001/books');
            setBooks(response.data);
        },[]);

    App.js:
        useEffect(() => {
                fetchBooks();
            }
        , [fetchBooks]);

    ** without useCallback
    initial render -> useEffect -> fetchBooks -> setBooks ->
    ...re-render Provider component + re-render child App ->
    ...re-initialize fetchBooks function ->
    ...useEffect detects update to fetchBooks -> useEffect -> fetchBooks (repeat...)

    ** with useCallback
    initial render -> useEffect -> fetchBooks -> setBooks ->
    ...re-render Provider component + re-render child App ->
    ...fetchBooks function reference remains stable (end)

 */

import {useState, createContext, useCallback} from "react";
import axios from "axios";

const BooksContext = createContext();

function PROVIDER_COMPONENT({children}) {

    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    },[]);

    const createBook = async (title)=> {
        const response = await axios.post('http://localhost:3001/books',
            { title });
        setBooks([...books, response.data]);

        // let newBook = {id: Math.round(Math.random()*1000), title};
        // setBooks([ ...books, newBook]);
    }

    const deleteBookById = async (id)=> {
        await axios.delete('http://localhost:3001/books/'+id);

        const updatedBooks = books.filter((book)=> {
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    const editBook = async (id, title)=> {
        const response = await axios.put(`http://localhost:3001/books/${id}`,
            {title});

        const updatedBook = response.data;

        let updatedBooks = books.map((book)=> {
            if (book.id === id) {
                return {...book, ...updatedBook};
            }
            return book;
        })
        setBooks(updatedBooks);

    }

    const valueToShare = {
        books,
        fetchBooks,
        createBook,
        deleteBookById,
        editBook
    }

    return <BooksContext.Provider  value={valueToShare}>
        {children}
    </BooksContext.Provider>
}

export { PROVIDER_COMPONENT };
export default BooksContext;