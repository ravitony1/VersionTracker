/**
 * this is kind of a data model map for projects, releases, and tasks
 */

import createReleaseRow from "../utils/createReleaseRow";
import createTaskRow from "../utils/createTaskRow";

const projects = [
  {
    name: "ENV1.5"
  },
  {
    name: "Project 2"
  },
  {
    name: "Project 3"
  }
];

const releases = [
  {
    ...createReleaseRow(
      "Version 4.0",
      "In Progress",
      0,
      "01/06/17",
      "",
      "Awesome...",
      ""
    ),
    tasks: [createTaskRow("In Progress", 0, "11/08/16", "", "Task 1")]
  },
  {
    ...createReleaseRow("Version 3.0", "Unreleased", 30, "11/06/16", "", ""),
    tasks: [createTaskRow("Unreleased", 30, "11/08/16", "", "Task 1")]
  },
  {
    ...createReleaseRow("Version 2.0", "Unreleased", 40, "08/22/16", "", ""),
    tasks: [createTaskRow("Unreleased", 40, "08/28/16", "", "Task 1")]
  },
  {
    ...createReleaseRow(
      "Version 1.0",
      "Released",
      100,
      "05/20/16",
      "09/12/16",
      "Version 1.0"
    ),
    tasks: [createTaskRow("Released", 100, "05/28/16", "09/12/16", "Task 1")]
  }
];

export { projects, releases };
