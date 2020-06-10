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
    const copyOfLikesArray = [...likesArray]
    const indexOfMaxLikes = copyOfLikesArray.indexOf(Math.max(...copyOfLikesArray))
    const blogNeededProperties = {
        title: blogs[indexOfMaxLikes].title,
        author: blogs[indexOfMaxLikes].author,
        likes: blogs[indexOfMaxLikes].likes
    }
    console.log(blogNeededProperties)
    return blogs.length === 1
        ? { title: blogs.title, author: blogs.author, likes: blogs.likes }
        : blogNeededProperties
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}