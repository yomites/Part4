const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "Ben Morrisson",
        url: "http:mybusiness.com",
        likes: 5,
    },
    {
        title: "Take me home tonight",
        author: "Sam Blake",
        url: "www.kanayo.com",
        likes: 4,
    },
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}