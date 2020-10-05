import React from "react";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";

/**
 * this component is rendered when any release row is expanded
 */
const Tasks = ({ tasks, releaseIndex }) => {
  return (
    <div>
      <CustomTable data={tasks} type="task" releaseIndex={releaseIndex} />
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array,
  releaseIndex: PropTypes.number
};

export default Tasks;
