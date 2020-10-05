import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectsContext } from "../context/ProjectsContext";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Releases from "../components/Releases";
import theme from "../theme";

const Project = () => {
  // use Projects data from ProjectsContext
  const { Projects } = useContext(ProjectsContext);
  // fetch the project data based on the "projectId" from the URL
  const project = Projects[useParams().id - 1];
  return (
    <>
      {project ? (
        <div style={{ margin: theme.spacing(8) }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{ textDecoration: "none", color: "rgba(0,0,0,0.5)" }}
              to="/"
            >
              Projects
            </Link>
            <Typography color="textPrimary">{project.name}</Typography>
          </Breadcrumbs>
          <h3
            style={{
              textAlign: "left",
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(4)
            }}
          >
            Releases
          </h3>
          <Divider
            style={{ marginBottom: theme.spacing(4), height: theme.spacing(2) }}
          />
          <Releases />
        </div>
      ) : (
        <div>
          <p>Failed to fetch project data. Might be a broken link</p>
          <Link to="/">View Projects</Link>
        </div>
      )}
    </>
  );
};

export default Project;
