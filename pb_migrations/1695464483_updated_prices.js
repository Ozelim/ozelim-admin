migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("154ve8kdx0z0clc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9mdt1rrn",
    "name": "prices",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r16j5jh3f6ukxpm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("154ve8kdx0z0clc")

  // remove
  collection.schema.removeField("9mdt1rrn")

  return dao.saveCollection(collection)
})
