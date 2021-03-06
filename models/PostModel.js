const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        default: 'public'
    },
    
    urlPathConfig: {
        type: String,
        // update... function to turn space-sep string into lowercase hyphen-sep string
        default: this.title
    },

    description: {
        type: String,
        required: true
    },
    
    creationDate: {
        type: Date,
        default: Date.now()
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    
    allowComments: {
        type: Boolean,
        default: false
    },
    
    file: {
        type: String,
        default: ''
    }
    
    
});

module.exports = {Post: mongoose.model('post', PostSchema )};
