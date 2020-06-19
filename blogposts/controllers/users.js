const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { request } = require('../app')
const { response } = require('express')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password === undefined || body.password.length < 3) {
        console.log(`Bad request. Password ${body.password} is shorter than the minimum required length(3)`)
        return response.status(400).json({ error: `password is empty or shorter than the minimum required length(3)` })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter