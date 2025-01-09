/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gvn9s6cbp9p3263")

  collection.name = "resorts_bids"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gvn9s6cbp9p3263")

  collection.name = "resort_bids"

  return dao.saveCollection(collection)
})
