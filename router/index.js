const express = require('express')
const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./../models/user');
const validate = require('../middlewares/validate');

const schema = joi.object({
  name: joi.string().min(3).required(),
  email:  joi.string().min(6).required().email(),
  password:  joi.string().min(6).required()
})

const loginSchema = joi.object({
  email:  joi.string().min(6).required().email(),
  password:  joi.string().min(6).required()
})


router.post('/register', async (req, res) => {
  // check validation of request body data
  const {error} = await schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name, email, password: hashedPassword
  })

  // check if user already exist
  const emailExist = await User.findOne({email});
  if (emailExist) return res.status(400).send('user already exist!');

  try {
    const savedUser = await user.save();
    return res.send(savedUser);
  } catch(err) {
    return res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const {error} = await loginSchema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) return res.status(400).send('no such email!');

  // bcrypt.compare return boolean
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('wrong password!');

  // jwt
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  
  try {
    // return res.send('logged in');
    return res.header('auth-token', token).send(token)
  } catch(err) {
    return res.status(400).send('something went wrong!');
  }
})

router.get('/users', validate, async(req,res)=> {
  console.log(req.user);
  const users = await User.find({});
  console.log(users)
  return res.send(users);
})

module.exports = router
