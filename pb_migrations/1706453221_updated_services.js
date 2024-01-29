migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86wgx4nnjr7xc9h")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86wgx4nnjr7xc9h")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
