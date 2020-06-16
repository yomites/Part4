const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
    })

    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {

    const blogToDelete = await Blog.findByIdAndRemove(request.params.id)
    if (blogToDelete) {
        response.status(204).end()
    } else {
        response.status(404).send(`The data is already deleted from database`)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
        response.status(204).json(updatedBlog.toJSON())
    } else {
        response.status(404).send('The data could not be found')
    }
})

module.exports = blogsRouter