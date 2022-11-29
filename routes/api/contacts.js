const express = require('express')
const router = express.Router()
const contacts = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {

    res.json({ message: 'template message' })
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {

    res.json({ message: 'template message' })
  } catch (error) {
    next(error);
  }})

router.delete('/:contactId', async (req, res, next) => {
  try {

    res.json({ message: 'template message' })
  } catch (error) {
    next(error);
  }})

router.put('/:contactId', async (req, res, next) => {
  try {

    res.json({ message: 'template message' })
  } catch (error) {
    next(error);
  }})

module.exports = router
