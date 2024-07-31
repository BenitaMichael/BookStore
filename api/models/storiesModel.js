import mongoose from "mongoose";

const storySchema = new mongoose.Schema (
    {
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        title: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            default: 'https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?w=740&t=st=1722383685~exp=1722384285~hmac=54fcf5f61733dde6d0692bb2f492e62c091a77ca8c0910a8be00b94dd076a608'
        },
         category: {
            type: String,
            default: 'Uncategorized'
         },
         slug: {
            type: String,
            required: true,
            unique: true
         },
    },
    {timestamps: true}
)

const Story = mongoose.model('Story', storySchema);

export default Story;