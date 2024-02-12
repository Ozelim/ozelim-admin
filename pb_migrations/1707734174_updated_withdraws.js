/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s07txcan",
    "name": "bank",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eykhtysj",
    "name": "iban",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xt0ej0ig",
    "name": "iin",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d8cme94imzx9wa6")

  // remove
  collection.schema.removeField("s07txcan")

  // remove
  collection.schema.removeField("eykhtysj")

  // remove
  collection.schema.removeField("xt0ej0ig")

  return dao.saveCollection(collection)
})
