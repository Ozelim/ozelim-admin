/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // remove field
  collection.fields.removeById("relation1647263543")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3861817060")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "aaa82jdyzs4zdch",
    "hidden": false,
    "id": "relation1647263543",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "market_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
