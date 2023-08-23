function getExtension(file) {
  if (!file) return
  if (file instanceof File) return file?.fileName?.split('.')?.pop()
  return file?.split('.')?.pop()
}

export { getExtension }