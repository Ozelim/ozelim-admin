/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hvz5katc3l1ggp7")

  collection.name = "dual_vacas"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hvz5katc3l1ggp7")

  collection.name = "dual_vaca"

  return dao.saveCollection(collection)
})
