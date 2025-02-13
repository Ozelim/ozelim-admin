/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // remove field
  collection.fields.removeById("text3797025375")

  // add field
  collection.fields.addAt(22, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1909277692",
    "max": 0,
    "min": 0,
    "name": "takeout",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(23, new Field({
    "hidden": false,
    "id": "bool2992215158",
    "name": "city_delivery",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(24, new Field({
    "hidden": false,
    "id": "json114857525",
    "maxSize": 0,
    "name": "between_cities",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(25, new Field({
    "hidden": false,
    "id": "bool1132546706",
    "name": "everywhere",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("i1m42vdwdgx7m1q")

  // add field
  collection.fields.addAt(22, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3797025375",
    "max": 0,
    "min": 0,
    "name": "takeout",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("text1909277692")

  // remove field
  collection.fields.removeById("bool2992215158")

  // remove field
  collection.fields.removeById("json114857525")

  // remove field
  collection.fields.removeById("bool1132546706")

  return app.save(collection)
})
