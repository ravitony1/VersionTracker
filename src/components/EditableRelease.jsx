import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { validStartDate, validEndDate } from "../utils/dateValidator";
/* MuI components */
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const getDateString = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const EditableRelease = ({ data, type, doneEdit }) => {
  let editData = { ...data };
  const [version, setVersion] = useState(editData.version);
  const [description, setDescription] = useState(editData.description);
  const [startDate, setStartDate] = useState(
    data.startDate ? getDateString(data.startDate) : ""
  );
  const [releaseDate, setReleaseDate] = useState(
    data.endDate ? getDateString(data.endDate) : ""
  );
  const [versionError, setVersionError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [releaseDateError, setReleaseDateError] = useState(false);
  const [startDateErrorText, setStartDateErrorText] = useState(
    "Start Date is required."
  );
  const [releaseDateErrorText, setReleaseDateErrorText] = useState(
    "Release Date should not be before the Start Date."
  );

  /* startDate & releaseDate validations */

  const setError = (field, errorText) => {
    if (field === "startDate") {
      setStartDateErrorText(errorText);
      setStartDateError(true);
    } else {
      setReleaseDateErrorText(errorText);
      setReleaseDateError(true);
    }
  };

  const startDateValidator = (start, release) => {
    if (start) {
      if (validStartDate(start, release)) {
        setStartDateError(false);
      } else {
        setError("startDate", "Start Date should not be after Release Date.");
      }
    } else {
      setError("startDate", "Start Date is required.");
    }
  };

  const releaseDateValidator = (release, start) => {
    if (release) {
      if (validEndDate(start, release)) {
        setReleaseDateError(false);
      } else {
        setError(
          "releaseDate",
          "Release Date should not be before Start Date."
        );
      }
    }
  };

  const updateVersion = (event) => {
    const value = event.target.value;
    setVersion(value);
    setVersionError(!Boolean(value.trim()));
  };

  const updateDescription = (event) => {
    setDescription(event.target.value);
  };

  const updateStartDate = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const updateReleaseDate = (event) => {
    const value = event.target.value;
    setReleaseDate(value);
  };

  const finalizeEdit = () => {
    // check if there are versiion, startDate, and releaseDate errors
    if (startDate && !startDateError && !releaseDateError) {
      if (version) {
        editData.version = version;
        editData.description = description;
        editData.startDate = startDate
          ? dayjs(startDate).format("MM/DD/YY")
          : "";
        editData.releaseDate = releaseDate
          ? dayjs(releaseDate).format("MM/DD/YY")
          : "";
        doneEdit(editData);
        setVersion("");
        setStartDate("");
        setReleaseDate("");
        setDescription("");
        setVersionError(false);
      } else {
        setVersionError(true);
      }
    } else {
      startDateValidator(startDate, releaseDate);
    }
  };

  useEffect(() => {
    if (startDate) {
      startDateValidator(startDate, releaseDate);
    }
    if (releaseDate) {
      releaseDateValidator(releaseDate, startDate);
    }
    return () => {};
    // eslint-disable-next-line
  }, [startDate, releaseDate]);

  return (
    <>
      <TableCell colSpan={4} align="center">
        <TextField
          id="filled-basic"
          label="Version"
          value={version}
          onChange={updateVersion}
          variant="filled"
          fullWidth
          required
          error={versionError}
          helperText={versionError ? "Version is required." : ""}
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
          value={releaseDate}
          onChange={updateReleaseDate}
          InputLabelProps={{
            shrink: true
          }}
          style={{
            width: 150,
            marginTop: `${releaseDateError ? "1.5rem" : "0"}`
          }}
          error={releaseDateError}
          helperText={releaseDateError ? `${releaseDateErrorText}` : ""}
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

export default EditableRelease;
