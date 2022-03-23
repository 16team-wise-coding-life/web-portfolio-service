import { Schema, model } from 'mongoose';

const UserImageSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'https://i.ibb.co/jTXFzFT/2021-10-07-10-48-59.png',
  },
});

const UserImageModel = model('UserImage', UserImageSchema);

export { UserImageModel };
