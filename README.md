# Course content and app created by Stephen Grider
## Udemy course “Modern React with Redux [2023 Update]
### Books Application design specified in Section 6, “How to Handle Forms”


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
So, when useEffect in the App executes its callback including the fetchBooks function which in turn executes setBooks,
and books state updates in the Provider component causing it to re-render,
the callback function referenced by fetchBooks will remain unchanged.
Therefor useEffect will not detect that its reference to fetchBooks has changed, and will not execute the callback again.
In this way we can avoid continuous re-rendering of the Provider component (which would also re-render the child App)

    // context/books.js
    
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












# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
