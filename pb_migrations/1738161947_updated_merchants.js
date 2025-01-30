/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Чтобы завершить создание магазина перейдите по ссылке ниже</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/market/join-club?token={TOKEN}\" target=\"_blank\" rel=\"noopener\">Перейти</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3326964774")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
})
