/**
 * return relevant STATUS based on the provided progress
 * @param {Number} progress
 */
export default function getStatus(progress) {
  if (progress >= 1 && progress <= 99) {
    return "Unreleased";
  } else if (progress === 100) {
    return "Released";
  } else {
    return "In Progress";
  }
}
