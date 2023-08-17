migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zn1r4xgc0fkv5tu")

  collection.name = "haelthBids"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zn1r4xgc0fkv5tu")

  collection.name = "haelthBid"

  return dao.saveCollection(collection)
})
