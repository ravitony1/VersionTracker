import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Row from "./Row";
import EditableRelease from "./EditableRelease";
/* MuI components */
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditableTask from "./EditableTask";
import { ReleasesContext } from "../context/ReleasesContext";
import getStatus from "../utils/getStatus";

const newRelease = {
  version: "",
  status: "In Progress",
  progress: 0,
  startDate: "",
  releaseDate: "",
  description: ""
};

const newTask = {
  status: "In Progress",
  progress: 0,
  startDate: "",
  endDate: "",
  description: ""
};

/**
 * this table component is used to render datatable for
 * both releases and tasks
 */
const CustomTable = ({ data, type, releaseIndex = null }) => {
  const { Releases, updateRelease, addRelease } = useContext(ReleasesContext);
  const [release, setRelease] = useState(newRelease);
  const [task, setTask] = useState(newTask);

  const addNewRelease = (e) => {
    addRelease(e);
    setRelease(newRelease);
  };

  /**
   * update status and progress of a release
   * when a task is added
   */
  const addTask = (e) => {
    const releases = [...Releases];
    let updatedRelease = releases[releaseIndex];
    let updatedTask = {
      ...e,
      status: getStatus(e.progress)
    };
    updatedRelease.tasks.push(updatedTask);
    const aggregateProgress = updatedRelease.tasks.reduce(
      (acc, curr) => curr.progress + acc,
      0
    );
    updatedRelease = {
      ...releases[releaseIndex],
      status: getStatus(aggregateProgress),
      progress: aggregateProgress
    };
    updateRelease(updatedRelease, releaseIndex);
    setTask(newTask);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {type === "release" ? <TableCell>Version</TableCell> : null}
            <TableCell>Status</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Start&nbsp;date</TableCell>
            <TableCell>
              {type === "release" ? "Release" : "End"}&nbsp;date
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <Row
              key={index}
              data={item}
              type={type}
              index={index}
              releaseIndex={releaseIndex}
            />
          ))}
          {type === "release" ? (
            <EditableRelease
              data={release}
              type="add"
              doneEdit={addNewRelease}
            />
          ) : (
            <EditableTask data={task} type="add" doneEdit={addTask} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default CustomTable;
