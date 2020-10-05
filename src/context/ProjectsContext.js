import React, { useState } from "react";
import { projects } from "../constants/fakeData";

const ProjectsContext = React.createContext({
  Projects: projects,
  setProjects: () => {}
});

const ProjectsContextProvider = ({ children }) => {
  const [Projects, setProjects] = useState(projects);

  const addProject = (project) => {
    setProjects([project, ...Projects]);
  };

  return (
    <ProjectsContext.Provider value={{ Projects, addProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsContextProvider };
