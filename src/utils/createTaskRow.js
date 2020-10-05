/**
 * Small utility function to create data for tasks table row
 * @param {String} status
 * @param {Number} progress
 * @param {String} startDate
 * @param {String} endDate
 * @param {String} description
 */
export default function createTaskRow(
  status,
  progress,
  startDate,
  endDate,
  description
) {
  return {
    status,
    progress,
    startDate,
    endDate,
    description
  };
}
