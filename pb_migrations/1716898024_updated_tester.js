/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p5hav9ccusfavml")

  // remove
  collection.schema.removeField("dhb5ul24")

  // remove
  collection.schema.removeField("3qaw5hzb")

  // remove
  collection.schema.removeField("ik4skpjv")

  // remove
  collection.schema.removeField("jeopdv7p")

  // remove
  collection.schema.removeField("dvsx7lut")

  // remove
  collection.schema.removeField("ebrci6tm")

  // remove
  collection.schema.removeField("6n4ashxm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ofvss7ga",
    "name": "questions",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p5hav9ccusfavml")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dhb5ul24",
    "name": "1",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3qaw5hzb",
    "name": "2",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ik4skpjv",
    "name": "3",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jeopdv7p",
    "name": "4",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvsx7lut",
    "name": "5",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebrci6tm",
    "name": "6",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6n4ashxm",
    "name": "7",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("ofvss7ga")

  return dao.saveCollection(collection)
})
