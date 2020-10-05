/**
 * Small utility function to create data for release table row
 * @param {String} version
 * @param {String} status
 * @param {Number} progress
 * @param {String} startDate
 * @param {String} releaseDate
 * @param {String} description
 */
export default function createReleaseRow(
  version,
  status,
  progress,
  startDate,
  releaseDate,
  description
) {
  return {
    version,
    status,
    progress,
    startDate,
    releaseDate,
    description
  };
}
