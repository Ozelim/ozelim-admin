/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2360448153")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "i1m42vdwdgx7m1q",
    "hidden": false,
    "id": "relation3544843437",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "product",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json4270793276",
    "maxSize": 0,
    "name": "pay",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "chqbwa938e4n1rd",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1715341057",
    "max": null,
    "min": null,
    "name": "total_cost",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1877329939",
    "max": null,
    "min": null,
    "name": "bonuses_spent",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text370448595",
    "max": 0,
    "min": 0,
    "name": "card",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number3731610979",
    "max": null,
    "min": null,
    "name": "refunded_sum",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2360448153")

  // remove field
  collection.fields.removeById("relation3544843437")

  // remove field
  collection.fields.removeById("json4270793276")

  // remove field
  collection.fields.removeById("relation2375276105")

  // remove field
  collection.fields.removeById("number1715341057")

  // remove field
  collection.fields.removeById("number1877329939")

  // remove field
  collection.fields.removeById("text370448595")

  // remove field
  collection.fields.removeById("number3731610979")

  return app.save(collection)
})
