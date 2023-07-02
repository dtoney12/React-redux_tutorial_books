/*
- Course content and app created by Stephen Grider
- Udemy course “Modern React with Redux [2023 Update]
- Section 6, “How to Handle Forms”
 */

// To start JSON server, npm run server


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {PROVIDER_COMPONENT} from "./context/books";

/*

A context is a design pattern to share functions and variables throughout the application.
The context is first instantiated from the React builder function createContext().

    const BooksContext = createContext();

A provider is a functional component that allows children component to be able to access context functions and variables.

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

        return <BooksContext.Provider  value={valueToShare}>
            {children}
        </BooksContext.Provider>
        ...
        export default BooksContext;

Exports referenced by the value prop are accessed by passing the context into React function useContext().

        import BooksContext from "../context/books";
        ...
        const { createBook } = useContext(BooksContext);

 */

ReactDOM.createRoot(document.getElementById('root')).render(
    <PROVIDER_COMPONENT>
        <App/>
    </PROVIDER_COMPONENT>
);