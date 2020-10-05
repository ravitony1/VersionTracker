import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { ReleasesContextProvider } from "./context/ReleasesContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Title from "./components/Title";
import Project from "./views/Project";
import Projects from "./views/Projects";
import "./styles.css";
import theme from "./theme";
import { ProjectsContextProvider } from "./context/ProjectsContext";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Projects context data and methods */}
      <ProjectsContextProvider>
        {/* Releases context data and methods */}
        <ReleasesContextProvider>
          <div className="App">
            <Title title="Project Management App" />
            {/* Router to traverse between links like "Projects", "Project", and "404" */}
            <Router>
              <Switch>
                <Route exact path="/">
                  <Projects />
                </Route>
                <Route exact path="/project/:id">
                  <Project />
                </Route>
                <Route path="*">
                  <Title title="404 Not Found" />
                  <Link to="/">View Projects</Link>
                </Route>
              </Switch>
            </Router>
          </div>
        </ReleasesContextProvider>
      </ProjectsContextProvider>
    </ThemeProvider>
  );
}
