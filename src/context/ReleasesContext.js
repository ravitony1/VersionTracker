import React, { useState } from "react";
import { releases } from "../constants/fakeData";

const ReleasesContext = React.createContext({
  Releases: releases,
  setReleases: () => {}
});

const ReleasesContextProvider = ({ children }) => {
  const [Releases, setReleases] = useState(releases);

  const addRelease = (release) => {
    setReleases([
      {
        ...release,
        tasks: []
      },
      ...Releases
    ]);
  };

  const deleteRelease = (index) => {
    let newReleases = [...Releases];
    newReleases.splice(index, 1);
    setReleases(newReleases);
  };

  const updateRelease = (latest, index) => {
    let newReleases = [...Releases];
    // update the old release with the new release
    newReleases[index] = latest;
    setReleases(newReleases);
  };

  return (
    <ReleasesContext.Provider
      value={{ Releases, addRelease, updateRelease, deleteRelease }}
    >
      {children}
    </ReleasesContext.Provider>
  );
};

export { ReleasesContext, ReleasesContextProvider };
