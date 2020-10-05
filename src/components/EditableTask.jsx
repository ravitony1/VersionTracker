import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { validStartDate, validEndDate } from "../utils/dateValidator";
/* MuI components */
import TableCell from "@material-ui/core/TableCell";
import { Button, Slider, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const getDateString = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const EditableTask = ({ data, type, doneEdit }) => {
  let editData = { ...data };
  const [progress, setProgress] = useState(editData.progress);
  const [description, setDescription] = useState(editData.description);
  const [startDate, setStartDate] = useState(
    data.startDate ? getDateString(data.startDate) : ""
  );
  const [endDate, setEndDate] = useState(
    data.endDate ? getDateString(data.endDate) : ""
  );
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [startDateErrorText, setStartDateErrorText] = useState(
    "Start Date is required."
  );
  const [endDateErrorText, setEndDateErrorText] = useState(
    "End Date should not be before the Start Date."
  );

  /* startDate & endDate validations */

  const setError = (field, errorText) => {
    if (field === "startDate") {
      setStartDateErrorText(errorText);
      setStartDateError(true);
    } else {
      setEndDateErrorText(errorText);
      setEndDateError(true);
    }
  };

  const startDateValidator = (start, end) => {
    if (start) {
      if (validStartDate(start, end)) {
        setStartDateError(false);
      } else {
        setError("startDate", "Start Date should not be after End Date.");
      }
    } else {
      setError("startDate", "Start Date is required.");
    }
  };

  const endDateValidator = (end, start) => {
    if (end) {
      if (validEndDate(start, end)) {
        setEndDateError(false);
      } else {
        setError("endDate", "End Date should not be before Start Date.");
      }
    }
  };

  // slider component provides the slide value as a separate value
  // event,target.value will be undefined
  const updateProgress = (event, value) => {
    setProgress(value);
  };

  const updateDescription = (event) => {
    setDescription(event.target.value);
  };

  const updateStartDate = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const updateEndDate = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const finalizeEdit = () => {
    // check if there are startDate & endDate errors
    if (!startDateError && !endDateError) {
      editData.progress = progress;
      editData.description = description;
      editData.startDate = startDate ? dayjs(startDate).format("MM/DD/YY") : "";
      editData.endDate = endDate ? dayjs(endDate).format("MM/DD/YY") : "";
      doneEdit(editData);
      setProgress(0);
      setDescription("");
      setStartDate("");
      setEndDate("");
    }
  };

  useEffect(() => {
    if (startDate) {
      startDateValidator(startDate, endDate);
    }
    if (endDate) {
      endDateValidator(endDate, startDate);
    }
    return () => {};
    // eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <>
      <TableCell colSpan={4} align="center">
        <Typography gutterBottom style={{ marginTop: "-0.5rem" }}>
          Progress
        </Typography>
        <Slider
          value={progress}
          aria-labelledby="progress-slider"
          valueLabelDisplay="on"
          step={5}
          track={false}
          min={0}
          max={100}
          style={{ marginTop: "2rem" }}
          onChange={updateProgress}
        />
      </TableCell>
      <TableCell colSpan={1} align="center">
        <TextField
          id="date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={updateStartDate}
          InputLabelProps={{
            shrink: true
          }}
          style={{
            width: 150,
            marginTop: `${startDateError ? "1.5rem" : "0"}`
          }}
          required
          error={startDateError}
          helperText={startDateError ? `${startDateErrorText}` : ""}
        />
      </TableCell>
      <TableCell colSpan={1} align="center">
        <TextField
          id="date"
          label="End Date"
          type="date"
          value={endDate}
          onChange={updateEndDate}
          InputLabelProps={{
            shrink: true
          }}
          style={{
            width: 150,
            marginTop: `${endDateError ? "1.5rem" : "0"}`
          }}
          error={endDateError}
          helperText={endDateError ? `${endDateErrorText}` : ""}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          id="filled-basic"
          label="Description"
          value={description}
          onChange={updateDescription}
          variant="filled"
          multiline
          style={{
            minWidth: 150
          }}
        />
      </TableCell>
      <TableCell align="center" colSpan={2}>
        <Button variant="contained" color="primary" onClick={finalizeEdit}>
          {type === "edit" ? "Done" : "Add"}
        </Button>
      </TableCell>
    </>
  );
};

export default EditableTask;
