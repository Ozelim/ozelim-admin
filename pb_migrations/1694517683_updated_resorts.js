migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aidgyuhh",
    "name": "phone",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // remove
  collection.schema.removeField("aidgyuhh")

  return dao.saveCollection(collection)
})
