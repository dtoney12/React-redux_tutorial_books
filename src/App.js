/*
- Course content and app created by Stephen Grider
- Udemy course “Modern React with Redux [2023 Update]
- Section 6, “How to Handle Forms”
 */

/*
fetchBooks is only called once (after initial render) because 2nd argument [] is empty.

ESLINT warning "React Hook useEffect has a missing dependency: 'fetchBooks'.
Either include it or remove the dependency array"
This warning refers to possible stale variable reference in fetchBooks in which subsequent
re-renders may refer to a variable from the previous render and not be updated to the intended new value.
More information about this issue in books.js comments.

useEffect callback cannot be an async function.
useEffect callback can only optionally return a function (not values or strings).
The returned function executes as a cleanup function before the useEffect callback executes again on subsequent re-renders.
For instance, click handlers set up in useEffect still remain from previous re-renders,
as well as new click handlers from updated renders.

    const [counter, setCounter] = useState(0);
    useEffect(()=> {
        const listener = ()=> console.log(counter);
        document.body.addEventListener("click", listener);
    }, [counter];

In the example above, each increment of counter will result in an additional click handler instance.
Cleanup functions can remove those stale click handlers.

    useEffect(()=> {
        ...
        return () => document.body.removeEventListener("click", listener);
        ...

 */

// To start JSON server, npm run server

import {useEffect, useContext } from "react";
import BookList from './components/BookList';
import BookCreate from './components/BookCreate';
import BooksContext from "./context/books";


function App() {

    const {fetchBooks} = useContext(BooksContext);

    useEffect(() => {
            fetchBooks();
        }
    , [fetchBooks]);

    return (
        <div className="app">
            <BookList />
            <BookCreate />
        </div>
    )
}

export default App;