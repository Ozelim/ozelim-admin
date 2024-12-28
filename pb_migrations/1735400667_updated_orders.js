/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

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
    "id": "number1186288468",
    "max": null,
    "min": null,
    "name": "total_amount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number1986885882",
    "max": null,
    "min": null,
    "name": "total_payed",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527180448")

  // remove field
  collection.fields.removeById("number1715341057")

  // remove field
  collection.fields.removeById("number1186288468")

  // remove field
  collection.fields.removeById("number1986885882")

  return app.save(collection)
})
