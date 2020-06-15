const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    if (blogs.length !== 0)
        expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'The uneven way to paradise',
        author: 'Ben Forster',
        url: 'www.benforster.com',
        likes: 8,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titleArray = blogsAtEnd.map(b => b.title)
    expect(titleArray).toContain(
        'The uneven way to paradise'
    )
})

test('a valid blog without the likes specified can be added', async () => {
    const newBlog = {
        title: 'Travelling through the nights',
        author: 'Adam Benky',
        url: 'www.adambenky.com',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length + 1)

    const titleArray = blogsAtEnd.map(b => b.title)
    expect(titleArray).toContain(
        'Travelling through the nights'
    )

    const likesArray = blogsAtEnd.map(b => b.likes)
    expect(likesArray[likesArray.length - 1]).toBe(0)
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'Blank Wood',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})