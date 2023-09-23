migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("154ve8kdx0z0clc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i0w9876g",
    "name": "heading",
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
    "id": "a7lmbhec",
    "name": "1",
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
    "id": "vxnearvn",
    "name": "2",
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
    "id": "yy852ldh",
    "name": "3",
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
    "id": "r7xa9kc3",
    "name": "4",
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
  const collection = dao.findCollectionByNameOrId("154ve8kdx0z0clc")

  // remove
  collection.schema.removeField("i0w9876g")

  // remove
  collection.schema.removeField("a7lmbhec")

  // remove
  collection.schema.removeField("vxnearvn")

  // remove
  collection.schema.removeField("yy852ldh")

  // remove
  collection.schema.removeField("r7xa9kc3")

  return dao.saveCollection(collection)
})
