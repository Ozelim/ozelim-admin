/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // remove field
  collection.fields.removeById("text3632866850")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number3632866850",
    "max": null,
    "min": null,
    "name": "rating",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4163081445")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3632866850",
    "max": 0,
    "min": 0,
    "name": "rating",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number3632866850")

  return app.save(collection)
})
