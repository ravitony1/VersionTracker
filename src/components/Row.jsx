import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Tasks from "./Tasks";
import EditableRelease from "./EditableRelease";
/* MuI components */
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { Chip } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
/* Icons */
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ReleasesContext } from "../context/ReleasesContext";
import EditableTask from "./EditableTask";
import getStatus from "../utils/getStatus";

const MenuText = ({ text }) => {
  return <span style={{ marginLeft: "0.5rem" }}>{text}</span>;
};

const Row = ({ data, type, index, releaseIndex = null }) => {
  const { Releases, updateRelease, deleteRelease } = useContext(
    ReleasesContext
  );
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (actionType) => {
    setAnchorEl(null);
    if (actionType === "edit") {
      setIsEdit(true);
    } else if (actionType === "delete") {
      if (type === "release") {
        deleteRelease(index);
      } else {
        deleteTask();
      }
    } else {
      setOpen(!open);
    }
  };

  /**
   * update status and progress of a release
   * when a task is deleted
   */
  const deleteTask = () => {
    const releases = [...Releases];
    let updatedRelease = releases[releaseIndex];
    updatedRelease.tasks.splice(index, 1);
    updateRelease(updatedRelease, releaseIndex);
    updateReleaseStatus();
  };

  /**
   * update status of a release & task
   * update progress of a release
   * when a task is updated
   */
  const updateTask = (e) => {
    const releases = [...Releases];
    let updatedRelease = releases[releaseIndex];
    let updatedTask = {
      ...e,
      status: getStatus(e.progress)
    };
    updatedRelease.tasks.splice(index, 1, updatedTask);
    updateData(updateRelease, releaseIndex);
    updateReleaseStatus();
  };

  const updateData = (e) => {
    updateRelease(e, index);
    setIsEdit(false);
  };

  /**
   * update status and progress of a release
   * when a task is updated or deleted
   */
  const updateReleaseStatus = () => {
    if (type === "task") {
      const releases = [...Releases];
      const aggregateProgress = releases[releaseIndex].tasks.reduce(
        (acc, curr) => curr.progress + acc,
        0
      );
      let updatedRelease = {
        ...releases[releaseIndex],
        status: getStatus(aggregateProgress),
        progress: aggregateProgress
      };
      updateRelease(updatedRelease, releaseIndex);
    } else {
      // do nothing since `status` depends only on tasks but not on releases
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Unreleased":
        return "#fff176";
      case "Released":
        return "#4db6ac";
      default:
        return "#4fc3f7";
    }
  };

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 8,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor: "#015384"
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#4db6ac"
    }
  }))(LinearProgress);

  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          <TableRow>
            {/* render editable release || task component OR static cells based on `isEdit` */}
            {isEdit ? (
              <>
                {type === "release" ? (
                  <EditableRelease
                    data={data}
                    type="edit"
                    doneEdit={updateData}
                  />
                ) : (
                  <EditableTask data={data} type="edit" doneEdit={updateTask} />
                )}
              </>
            ) : (
              <>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    <DragIndicatorIcon />
                  </IconButton>
                </TableCell>
                {type === "release" ? (
                  <TableCell component="th" scope="row">
                    {data.version}
                  </TableCell>
                ) : null}
                <TableCell>
                  <Chip
                    size="small"
                    style={{
                      backgroundColor: statusColor(data.status),
                      minWidth: "120px"
                    }}
                    label={data.status}
                  />
                </TableCell>
                <TableCell>
                  <BorderLinearProgress
                    variant="determinate"
                    value={data.progress}
                  />
                </TableCell>
                <TableCell>{data.startDate}</TableCell>
                {type === "release" ? (
                  <TableCell>{data.releaseDate || ".."}</TableCell>
                ) : (
                  <TableCell>{data.endDate || ".."}</TableCell>
                )}
                <TableCell>{data.description || ".."}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleClose("edit")}>
                      <EditIcon />
                      <MenuText text="Edit" />
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("delete")}>
                      <DeleteIcon />
                      <MenuText text="Delete" />
                    </MenuItem>
                    {type === "release" ? (
                      <MenuItem onClick={() => handleClose("create-task")}>
                        <AddCircleIcon />
                        <MenuText text="Create Task" />
                      </MenuItem>
                    ) : null}
                  </Menu>
                </TableCell>
              </>
            )}
          </TableRow>
          {type === "release" ? (
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={12}
              >
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <h3 style={{ margin: "0.5rem" }}>Tasks</h3>
                  <Tasks tasks={data.tasks} releaseIndex={index} />
                </Collapse>
              </TableCell>
            </TableRow>
          ) : null}
        </>
      ) : null}
    </>
  );
};

Row.propTypes = {
  data: PropTypes.shape({
    version: PropTypes.string,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string.isRequired
  }).isRequired,
  type: PropTypes.string.isRequired
};

export default Row;
