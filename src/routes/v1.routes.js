const express = require('express');
const ContactsController = require('../app/controlllers/ContactsController')
const router = express.Router();


router.get('/',ContactsController.getAllContacts)

router.get('/:busca',ContactsController.getOneContact)

router.post("/",ContactsController.createContacts)




module.exports= app=>app.use("/api/v1/contacts",router);