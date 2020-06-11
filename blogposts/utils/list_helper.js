const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    const reducer = (sum, item) => {
        return sum + item
    }

    return likesArray.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const likesArray = blogs.map(blog => blog.likes)
    const indexOfMaxLikes = likesArray.indexOf(Math.max(...likesArray))
    const blogNeededProperties = {
        title: blogs[indexOfMaxLikes].title,
        author: blogs[indexOfMaxLikes].author,
        likes: blogs[indexOfMaxLikes].likes
    }
    return blogs.length === 1
        ? { title: blogs.title, author: blogs.author, likes: blogs.likes }
        : blogNeededProperties
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const authorsArray = blogs.map(blog => blog.author)

    const authorAndNumberOfBlogs = _.countBy(authorsArray)
    const authorWithHighestBlogs = _.maxBy(_.keys(authorAndNumberOfBlogs), function (f) {

        return authorAndNumberOfBlogs[f]
    })
    console.log(authorAndNumberOfBlogs)
    console.log('Author with highest blogs', authorWithHighestBlogs)
    const numberOfBlogs = _.values(authorAndNumberOfBlogs)
    const highestValue = Math.max(...numberOfBlogs)
    console.log('Highest Value', highestValue)

    return { author: authorWithHighestBlogs, blogs: highestValue }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}