/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m363j26byirg7ur")

  collection.name = "home_data"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m363j26byirg7ur")

  collection.name = "home_dara"

  return dao.saveCollection(collection)
})
