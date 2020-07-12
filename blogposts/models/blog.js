const mongoose = require('mongoose')
require('mongoose-type-url')

mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
  url: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,

})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog