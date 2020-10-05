# Project Management App

This project management application is built using React and Material-UI framework.

- Utilizes React Router for browser-based routing
- Material-UI framework for components, theming, icons, etc.

### Features!

- Create any number of **Projects**
- Each **Project** can have any number of **Releases**
- Each **Release** can have any number of **Tasks**
- Each **Task** progress will have an impact on the _progress_ & _status_ of a **Release**

### Packages

Project management uses below open source projects to work properly:

- [React](https://reactjs.org/) - A JavaScript UI library for developing web applications and user interfaces
- [React Router](https://reactrouter.com/) - A library which provides declarative routing for React application
- [Material UI](https://material-ui.com/) - React components for faster and easier web development.

### Development

Thanks to [CodeSandbox](https://codesandbox.io/) which is an instant IDE and prototyping tool for rapid web development.

All the dependencies were specified in `package.json` from which CodeSandbox will install and compile the modules finally make app come alive right in the browser.

Good thing is that it has `React Dev Tools` integrated in the developer console which can be seen at the bottom of a sandbox browser view.

### Challenges

When I read and saw the requirements as well as a sample app screenshot, the assignment looked simple but had hard time figuring the right data model & data flow strategy between _views_ & _components_.

Because of the tight coupling of `releases` & `tasks` with components like `CustomTable.jsx` & `Row.jsx` caused problems working with libraries like `react-dnd` & `react-beautiful-dnd` trying to implement `Drag n Drop` functionality in the app.

The problem is that `innerRef` used by both the libraries don't work on custom components of `Material UI` framework since they need real DOM nodes.

Error I couldn't solve within time frame ->

> Invariant failed:
> provided.innerRef has not been provided with a HTMLElement.

I found this guide on using the innerRef callback functions but of no use:
https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md

### Todos

- Add _Drag and Drop_ functionality to move _tasks_ between releases
- Improve using more components especially true in case of `Row.jsx` & `CustomTable.jsx`
- Write _Tests_ using _Jest_ testing framework

## License

MIT
