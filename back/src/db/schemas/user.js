import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '설명이 아직 없습니다. 추가해 주세요.',
    },
    image: {
      type: String,
      required: true,
      default:
        'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F928e6b4b-0a57-43cd-8780-e6d7e28b421e%2F16%ED%8C%80.png?id=8129f2c3-44a7-4c69-b9b7-c7bca7c9fd05&table=block&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=500&userId=80cf9ec5-875c-4134-9ca3-165818e402cc&cache=v2',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export { UserModel };
