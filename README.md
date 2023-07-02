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

    **books.js:
    
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
