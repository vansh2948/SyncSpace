import { Schema, model, Document, Types } from "mongoose";

export interface IRoom extends Document {
  roomId: string;

  owner: Types.ObjectId;

  participants: Types.ObjectId[];

  code: string;

  whiteboard: any[];

  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    code: {
      type: String,
      default: `function hello() {
  console.log("Welcome to SyncSpace");
}
`,
    },

    whiteboard: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.index({
  roomId: 1,
});

const Room = model<IRoom>("Room", roomSchema);

export default Room;