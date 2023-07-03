# Course content and app created by Stephen Grider
## from Udemy course “Modern React with Redux [2023 Update]
### This application "Books" is detailed in Sections 6 - 9



Application screenshot:
<img width="1440" alt="Screen Shot 2023-07-01 at 9 59 14 PM" src="https://github.com/dtoney12/udemy-react-redux-tutorial-books_section6/assets/24409524/47875a76-f99e-4dbf-8fed-1826b29b9110">


## To run:
  1. start JSON server via npm run server
  2. start app via npm start

## Technical notes:

### Context

A context is a design pattern to share functions and variables throughout the application.
The context is first instantiated from the React builder function createContext().

    // context/books.js
    
    const BooksContext = createContext();

A provider is a functional component that allows children component to be able to access context functions and variables.

    // context/books.js
    
       function PROVIDER_COMPONENT({children}) {...
            const createBook = async (title)=> { ...
            const valueToShare = {
                createBook,
                ...
       ...
       export { PROVIDER_COMPONENT };

A React context Provider component is returned from the provider functional component.
In this case, BooksContext.Provider is exported (default) as BooksContext.
Context functions and variables are shared as a values prop.
Child access is specified through nesting of children component within the parent provider component.

    // context/books.js
    
        return <BooksContext.Provider  value={valueToShare}>
            {children}
        </BooksContext.Provider>
        ...
        export default BooksContext;

Exports referenced by the value prop are accessed by passing the context into React function useContext().

    // components/BookCreate.js
    
        import BooksContext from "../context/books";
        ...
        const { createBook } = useContext(BooksContext);

### useEffect

1.
fetchBooks would only be called once (after initial render) if 2nd argument [] is empty.
However in this case we are monitoring state change of fetchBooks reference.

    // App.js
   
        useEffect(() => {
                fetchBooks();
            }
        , [fetchBooks]);

If 2nd argument above is empty array, then ESLint will report a warning:
"React Hook useEffect has a missing dependency: 'fetchBooks'.  Either include it or remove the dependency array".

This warning refers to possible stale variable reference in fetchBooks in which subsequent
re-renders may refer to a variable from the previous render and not be updated to the intended new value.

(for more information, refer to the useCallback explanation below).

2.
useEffect callback cannot be an async function.

3.
useEffect callback can only optionally return a function (not values or strings).
The returned function executes as a cleanup function before the useEffect callback executes again on subsequent re-renders.
For instance, click handlers set up in useEffect still remain from previous re-renders,
as well as new click handlers from updated renders.

    // App.js
    
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

### Spread Operator

updatedBook spread operator ensures all updates from database are copied over to the local book state.

    const editBook = async (id, title)=> { ...
        return {...book, ...updatedBook};

### useCallback

useCallback() with empty 2nd argument returns a stable reference to the arrow function 1st argument.
Subsequent re-renders will continue to return a reference to that same function.
So, when useEffect in the App executes its callback, the Provider component will re-render since state has changed (setBooks),
causing a possible re-initialization of the fetchBooks function.  However, since we have wrapped fetchBooks function reference in useCallback, fetchBooks reference will remain unchanged.

Therefore useEffect in the App will not detect that its reference to fetchBooks has changed, and will not execute its callback again.
In this way we can avoid continuous re-rendering of the Provider component (which would also re-render the child App).  The sequence of events in explained below for both the improper case in which useCallback is not utilized, and the proper usage of useCallback.

    // context/books.js  (Provider component)
    
        const fetchBooks = useCallback(async () => {
            const response = await axios.get('http://localhost:3001/books');
            setBooks(response.data);
        },[]);

    // App.js
        useEffect(() => {
                fetchBooks();
            }
        , [fetchBooks]);


This is the cycle of what will happen if the fetchBooks is not wrapped in useCallback upon initiation of the function:

Initial render -> useEffect -> fetchBooks -> setBooks ->
...re-render Provider component + re-render child App ->
...re-initialize fetchBooks function ->
...useEffect detects update to fetchBooks -> useEffect -> fetchBooks (repeat...)

We can demonstrate this cycle in the browser which continuously fetches:
<img width="1423" alt="Screen Shot 2023-07-01 at 10 20 24 PM" src="https://github.com/dtoney12/udemy-react-redux-tutorial-books_section6/assets/24409524/632f9712-7be2-4cef-be5b-db3f63158489">

We can fix this by wrapping fetchBooks in the useCallback hook.  The sequence of execution will halt after a single re-render of the App:

Initial render -> useEffect -> fetchBooks -> setBooks ->
...re-render Provider component + re-render child App ->
...fetchBooks function reference remains stable (end)

The browser will fetch normally when useCallback is used to prevent fetchBooks from referencing a different functional object:
<img width="1436" alt="Screen Shot 2023-07-01 at 10 27 47 PM" src="https://github.com/dtoney12/udemy-react-redux-tutorial-books_section6/assets/24409524/8785dcd0-eb85-4e2f-b57a-ac58d0bc864d">



