import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import theme from "../theme";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import { ProjectsContext } from "../context/ProjectsContext";
import { Paper } from "@material-ui/core";

const Projects = () => {
  // use Projects data as well as addProject method from ProjectsContext
  const { Projects, addProject } = useContext(ProjectsContext);

  // add a project
  const createProject = (project) => {
    addProject(project);
  };

  return (
    <div>
      <h2>Projects</h2>
      <Paper
        variant="outlined"
        style={{
          marginLeft: theme.spacing(6),
          marginRight: theme.spacing(6),
          padding: 0
        }}
      >
        <List
          component="nav"
          aria-label="projects"
          style={{
            maxHeight: 300,
            overflowY: "auto",
            margin: 0,
            padding: 0
          }}
        >
          {Projects.map((project, index) => (
            <Link
              key={index}
              to={`/project/${index + 1}`}
              style={{
                textDecoration: "none",
                fontFamily: theme.fonts.heading,
                color: theme.colors.text
              }}
            >
              <ListItem button>
                <ListItemText
                  primary={project.name}
                  style={{ marginLeft: theme.spacing(4) }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
      <AddProject addProject={createProject} />
    </div>
  );
};

export default Projects;
