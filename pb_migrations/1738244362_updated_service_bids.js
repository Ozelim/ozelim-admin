/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("va5ascyo33rqm05")

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "bool1675560985",
    "name": "pay_bonuses",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("va5ascyo33rqm05")

  // remove field
  collection.fields.removeById("bool1675560985")

  return app.save(collection)
})
