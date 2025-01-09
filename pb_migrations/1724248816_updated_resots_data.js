/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  collection.name = "resorts_data"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("135kgze7nt50zeg")

  collection.name = "resots_data"

  return dao.saveCollection(collection)
})
