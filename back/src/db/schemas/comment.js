import { Schema, model, Mongoose } from 'mongoose';

const CommentSchema = new Schema({
  board_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'FreeBoard',
  },
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const CommentModel = model('Comment', CommentSchema);

export { CommentModel };
