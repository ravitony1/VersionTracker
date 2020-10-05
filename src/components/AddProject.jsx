import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";

const AddProject = ({ addProject }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const finalizeProject = () => {
    if (name) {
      addProject({ name });
      // clear the name value in the text field
      setName("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Grid container style={{ margin: "1.5rem" }} alignItems="center">
      <Grid item xs={7}>
        <TextField
          id="filled-basic"
          label="Project Name"
          value={name}
          onChange={updateName}
          variant="filled"
          fullWidth
          required
          error={error}
          helperText={error ? "Name is required!" : ""}
        />
      </Grid>
      <Grid item style={{ marginLeft: "1rem" }}>
        <Button variant="contained" color="primary" onClick={finalizeProject}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddProject;
