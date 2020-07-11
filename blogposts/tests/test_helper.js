const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "Ben Morrisson",
        url: "http://mybusiness.com",
        likes: 5,
    },
    {
        title: "Take me home tonight",
        author: "Sam Blake",
        url: "www.kanayo.com",
        likes: 4,
    },
    {
        title: "Power of Javascript",
        author: "Matti Kauninen",
        url: "www.javascript.com",
        likes: 25,
        user: "5f0a007bb3a0534e38fa0433"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'This is for testing and will be removed soon',
        author: 'Ben Testing',
        url: 'www.testing.com',
        likes: 4,
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingId,
    usersInDb,
}