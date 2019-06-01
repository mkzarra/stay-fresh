export default function(value) {
  if (!value) {
    return false;
  }
  return value.trim() !== "";
}