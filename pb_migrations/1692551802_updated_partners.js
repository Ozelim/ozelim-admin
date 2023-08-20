migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ec8itjio",
    "name": "1",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ioqilozq",
    "name": "2",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yz6plawt",
    "name": "3",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "embc9wgm",
    "name": "4",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo")

  // remove
  collection.schema.removeField("ec8itjio")

  // remove
  collection.schema.removeField("ioqilozq")

  // remove
  collection.schema.removeField("yz6plawt")

  // remove
  collection.schema.removeField("embc9wgm")

  return dao.saveCollection(collection)
})
