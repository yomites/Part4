const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithEmptyContent = []

    const listWithOneBlog = [
        {
            title: "HTML is easy",
            author: "Ben Morrisson",
            url: "http:mybusiness.com",
            likes: 5,
            id: "5edddee2582b5d2174735d04"
        }
    ]

    const listWithManyBlogs = [
        {
            title: "HTML is easy",
            author: "Ben Morrisson",
            url: "http:mybusiness.com",
            likes: 5,
            id: "5edddee2582b5d2174735d04"
        },
        {
            title: "Take me home tonight",
            author: "Sam Blake",
            url: "www.kanayo.com",
            likes: 4,
            id: "5edde693d25a7946a41425d1"
        },
        {
            title: "Take me home tonight and forever",
            author: "Sammy Blaker",
            url: "www.kanayo.com",
            likes: 10,
            id: "5edde716d25a7946a41425d2"
        },
        {
            title: "Postman is cool too",
            author: "Abel Markky",
            url: "www.postman.com",
            likes: 12,
            id: "5edde96fd2278a3a8c121dc8"
        },
        {
            title: "Power of Javascript",
            author: "Matti Liukainen",
            url: "www.javascript.com",
            likes: 25,
            id: "5eddeca87f697b1bcc63037e"
        },
        {
            title: "The night of terror",
            author: "Ken Wood",
            url: "www.kenwood.com",
            likes: 7,
            id: "5edded317f697b1bcc63037f"
        },
        {
            title: "The limelight",
            author: "Grasley Mosley",
            url: "www.limelight.com",
            likes: 14,
            id: "5ede04762805fb1e809c7fd6"
        },
        {
            title: "The story of mankind",
            author: "Grasley Mosley",
            url: "www.mankindstroy.com",
            likes: 11,
            id: "5ede90cfe23ee44e90168709"
        },
        {
            title: "The power of love",
            author: "Anthony Morris",
            url: "www.anthonymorris.com",
            likes: 21,
            id: "5ede92f56a5ada3f8481d788"
        },
        {
            title: "Kings of the jungle",
            author: "Brad Sparrow",
            url: "www.junglekings.com",
            likes: 17,
            id: "5ede93297e73873520d6e858"
        },
        {
            title: "Love and soccer",
            author: "Alex Fergusson",
            url: "www.loveandsoccer.com",
            likes: 23,
            id: "5ede939e93c240242c3f9c03"
        },
        {
            title: "The power of Java",
            author: "Kevin Moore",
            url: "www.kevinmoore.com",
            likes: 14,
            id: "5ede963d7b474c16e877b5ed"
        },
        {
            title: "The adventure of Riina",
            author: "Pat Mason",
            url: "www.patmason.com",
            likes: 7,
            id: "5ede96e17b474c16e877b5ee"
        }
    ]

    test('of an empty list is zero', () => {
        const result = listHelper.totalLikes(listWithEmptyContent)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(170)
    })
})