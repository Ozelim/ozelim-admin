migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6vkhwhjrm8sqph")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ae77obnr",
    "name": "inst",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dhsq9qma",
    "name": "whats",
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
  collection.schema.removeField("ae77obnr")

  // remove
  collection.schema.removeField("dhsq9qma")

  return dao.saveCollection(collection)
})
