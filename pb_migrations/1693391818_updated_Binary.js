migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x7glx5z3xv1fq5d")

  collection.name = "binary"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x7glx5z3xv1fq5d")

  collection.name = "Binary"

  return dao.saveCollection(collection)
})
