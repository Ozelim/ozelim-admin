/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // remove field
  collection.fields.removeById("json1339489441")

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "json2087664633",
    "maxSize": 0,
    "name": "delivery_data",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "json3823925337",
    "maxSize": 0,
    "name": "takeout_data",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "json1339489441",
    "maxSize": 0,
    "name": "refund_data",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("json2087664633")

  // remove field
  collection.fields.removeById("json3823925337")

  return app.save(collection)
})
