const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const authorization = 'authorization'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNWYwYTAwN2JiM2EwNTM0ZTM4ZmEwNDMzIiwiaWF0IjoxNTk0NDkxOTExfQ.VIstT8Q5f5gXjQF_GewcCPM-p8Ugs5NTvVy0OrhVKlk'

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property of blog post is named id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        if (blogs.length !== 0)
            expect(blogs[0].id).toBeDefined()
    })
})

describe('addition of a new blog post', () => {

    test('succeeds with a valid data', async () => {
        const newBlog = {
            title: 'The uneven way to paradise',
            author: 'Ben Forster',
            url: 'www.benforster.com',
            likes: 8,
        }

        await api
            .post('/api/blogs')
            .set(authorization, `bearer ${token}`)
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

    test('when likes is undefined succeeds with likes taking a default value of 0', async () => {
        const newBlog = {
            title: 'Travelling through the nights',
            author: 'Adam Benky',
            url: 'www.adambenky.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(authorization, `bearer ${token}`)
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

    test('fails with status code 401 if token is not provided or invalid', async () => {
        const newBlog = {
            title: 'Bear with me',
            author: 'Blank Wood',
            url: 'www.bearwithme.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set(authorization, `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNWYwYTAwN2JiM2EwNTM0ZTM4ZmEwNDMzIiwiaWF0IjoxNTk0NDkxOTExfQ.VIstT8Q5f5gXjQF_GewcCPM-p8Ugs5NTvVy0OrhV`)
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if data is invalid and the correct token is provided', async () => {
        const newBlog = {
            author: 'Blank Wood',
            url: 'www.bearwithme.com',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .set(authorization, `bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid and the blog exists', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[2]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set(authorization, `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })

    test('succeeds/fails with status code 404 if id is valid but blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .set(authorization, `bearer ${token}`)
            .expect(404)
    })
})

describe('updating a specific blog', () => {
    test('succeeds when the blog exists and have a valid id', async () => {
        const updateValue = {
            likes: 20,
        }
        const blogsAtStart = await helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]

        const resultBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateValue)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(updateValue.likes).toBe(blogsAtEnd[0].likes)
    })

    test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
            .put(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with status code 400 if the id is not valid', async () => {
        const invalidId = '23dferth456dfg45rtf678f'

        await api
            .put(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})