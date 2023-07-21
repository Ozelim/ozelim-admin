function getPropertyKey(object, property) {
  if (object.hasOwnProperty(property)) {
    return property;
  }
  return property;
}

export { getPropertyKey }