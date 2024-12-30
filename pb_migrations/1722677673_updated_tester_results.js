/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhk2fcri",
    "name": "totalQuestions",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vnvtf5bd",
    "name": "rightAnswers",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n5cehtln",
    "name": "passed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nq3lsrjpiyr3xt0")

  // remove
  collection.schema.removeField("vhk2fcri")

  // remove
  collection.schema.removeField("vnvtf5bd")

  // remove
  collection.schema.removeField("n5cehtln")

  return dao.saveCollection(collection)
})
