import React, { useContext } from "react";
import { ReleasesContext } from "../context/ReleasesContext";
import CustomTable from "./CustomTable";

const Releases = () => {
  const { Releases } = useContext(ReleasesContext);
  return (
    <div>
      <CustomTable data={Releases} type="release" />
    </div>
  );
};

export default Releases;
