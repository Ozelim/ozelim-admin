/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kr0rtw7z",
    "name": "inc",
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
  const collection = dao.findCollectionByNameOrId("tcv5x3s69htp52h")

  // remove
  collection.schema.removeField("kr0rtw7z")

  return dao.saveCollection(collection)
})
