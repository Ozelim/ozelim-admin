migrate((db) => {
  const snapshot = [
    {
      "id": "6zm7vioi7ekbfhq",
      "created": "2023-07-01 09:00:16.111Z",
      "updated": "2023-07-25 07:06:41.833Z",
      "name": "site",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "0ocm4aa4",
          "name": "data",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "ty023348izzzjbo",
      "created": "2023-07-01 12:04:07.329Z",
      "updated": "2023-07-25 07:06:41.834Z",
      "name": "partners",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wtiotu52",
          "name": "images",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 99,
            "maxSize": 5242880,
            "mimeTypes": [],
            "thumbs": [],
            "protected": false
          }
        },
        {
          "system": false,
          "id": "drhvw0nz",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "mjtnkkmo",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "_pb_users_auth_",
      "created": "2023-07-02 09:50:29.551Z",
      "updated": "2023-07-25 07:06:41.834Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "mhivzew9",
          "name": "city",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "cwlprtfg",
          "name": "birthday",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "jlv9ignn",
          "name": "iin",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "h2nacwm0",
          "name": "phone",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "9gnmqr00",
          "name": "sponsor",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "rkddvnyh",
          "name": "referals",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "d73uymn1",
          "name": "bin",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 2,
            "displayFields": [
              "email"
            ]
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "id = @request.auth.id || sponsor = @request.auth.id",
      "deleteRule": "",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "dohznrx4zqairb8",
      "created": "2023-07-17 04:33:58.241Z",
      "updated": "2023-08-01 09:45:11.780Z",
      "name": "pyramid",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "mrliwfr7",
          "name": "sponsor",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "waail0fy",
          "name": "b1",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 2,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "eipaoazq",
          "name": "b2",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 4,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "5vhyvuss",
          "name": "b3",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 8,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "rvegqiaf",
          "name": "b4",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 16,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "ph7aglks",
          "name": "b5",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 32,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "rmpmfjxr",
          "name": "b6",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 64,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "gs8wa2yo",
          "name": "b7",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 128,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "qepao6oo",
          "name": "b8",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 256,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "0l5tog59",
          "name": "b9",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 512,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "mreaj5p9",
          "name": "b10",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1024,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "fgnt6pnk",
          "name": "b11",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 2048,
            "displayFields": [
              "email"
            ]
          }
        },
        {
          "system": false,
          "id": "yhno0qws",
          "name": "b12",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 4096,
            "displayFields": [
              "email"
            ]
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "ifk200j89xwaa3m",
      "created": "2023-07-21 05:00:27.116Z",
      "updated": "2023-07-25 07:06:41.834Z",
      "name": "slider",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ktwnnv07",
          "name": "page",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "pgfixuhd",
          "name": "image",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 99,
            "maxSize": 5242880,
            "mimeTypes": [],
            "thumbs": [],
            "protected": false
          }
        },
        {
          "system": false,
          "id": "geupnef6",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "u7afoihf",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "f75plxuj",
          "name": "link",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "7e2zxwmzmnxm2ai",
      "created": "2023-07-21 05:05:20.779Z",
      "updated": "2023-07-25 07:06:41.834Z",
      "name": "text",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "kg5wmfdz",
          "name": "page",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ux1fqr2m",
          "name": "headings",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "rtos09sw",
          "name": "text",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "oatxc3dg14o3k0m",
      "created": "2023-07-21 05:05:48.228Z",
      "updated": "2023-07-26 09:18:37.399Z",
      "name": "images",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "i2vsqqkp",
          "name": "page",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "3gysefik",
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
        },
        {
          "system": false,
          "id": "bxrbcki0",
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
        },
        {
          "system": false,
          "id": "nhovy2x1",
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
        },
        {
          "system": false,
          "id": "3a9qg6ed",
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
        },
        {
          "system": false,
          "id": "dkqivuas",
          "name": "5",
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
        },
        {
          "system": false,
          "id": "hvleqirp",
          "name": "6",
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
        },
        {
          "system": false,
          "id": "miglle3f",
          "name": "7",
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
        },
        {
          "system": false,
          "id": "fc3i47j5",
          "name": "8",
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
        },
        {
          "system": false,
          "id": "tnkqff9c",
          "name": "9",
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
        },
        {
          "system": false,
          "id": "ljns1mss",
          "name": "10",
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
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "b6vkhwhjrm8sqph",
      "created": "2023-07-27 09:31:09.843Z",
      "updated": "2023-07-31 09:45:44.718Z",
      "name": "resorts",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "hk2lgtx3",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ssu1g0tc",
          "name": "adress",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "phagecwq",
          "name": "region",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "dmn29smy",
          "name": "status",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 2,
            "values": [
              "bomj",
              "good"
            ]
          }
        },
        {
          "system": false,
          "id": "cesjgdxu",
          "name": "cost",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "vbfcfttg",
          "name": "duration",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "sgyat25b",
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
        },
        {
          "system": false,
          "id": "fpjknvpx",
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
        },
        {
          "system": false,
          "id": "ycsanjnb",
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
        },
        {
          "system": false,
          "id": "cqawtybj",
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
        },
        {
          "system": false,
          "id": "jffytbgt",
          "name": "5",
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
        },
        {
          "system": false,
          "id": "5x4wrrwu",
          "name": "6",
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
        },
        {
          "system": false,
          "id": "vn5imlpl",
          "name": "7",
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
        },
        {
          "system": false,
          "id": "haijpzfj",
          "name": "8",
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
        },
        {
          "system": false,
          "id": "pez2ggyq",
          "name": "9",
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
        },
        {
          "system": false,
          "id": "m8j7hrst",
          "name": "10",
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
        },
        {
          "system": false,
          "id": "v363eqlx",
          "name": "11",
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
        },
        {
          "system": false,
          "id": "mithioms",
          "name": "tags",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "qieelnie",
          "name": "diseas",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "elmoqnyg",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "crqqvpk5n7i5mif",
      "created": "2023-08-04 06:14:36.229Z",
      "updated": "2023-08-04 07:58:54.273Z",
      "name": "utils",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ndsmt82o",
          "name": "regions",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "xebbceud",
          "name": "diseases",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
