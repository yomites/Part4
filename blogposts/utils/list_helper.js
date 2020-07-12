const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
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
  const authorsArray = blogs.map(blog => blog.author.toUpperCase())

  const authorAndNumberOfBlogs = _.countBy(authorsArray)
  const authorWithHighestBlogs = _.maxBy(_.keys(authorAndNumberOfBlogs), function (o) {

    return authorAndNumberOfBlogs[o]
  })

  const numberOfBlogs = _.values(authorAndNumberOfBlogs)
  const highestValue = Math.max(...numberOfBlogs)

  return { author: authorWithHighestBlogs, blogs: highestValue }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const authorAndLikesArray = Object.values(blogs.map(({ author, likes }) => ({
    author, likes
  })).reduce(function (l, a) {
    const key = a.author
    if (!l[key]) {
      l[key] = a
    } else {
      l[key].likes += a.likes
    }
    return l
  }, {}))

  const authorWithLargestLikes = _.maxBy(authorAndLikesArray, 'likes')

  return authorWithLargestLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}