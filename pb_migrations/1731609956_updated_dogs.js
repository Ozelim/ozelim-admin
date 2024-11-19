/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7")

  // remove
  collection.schema.removeField("ep7ey8sk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izph2wmu",
    "name": "dogs",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b2ewghzbyc577d7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ep7ey8sk",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("izph2wmu")

  return dao.saveCollection(collection)
})
