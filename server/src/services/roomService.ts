import Room from "../models/Room";
import generateRoomId from "../utils/generateRoomId";

class RoomService {
  /**
   * Create Room
   */
  async createRoom(ownerId: string) {
    let roomId = generateRoomId();

    while (await Room.exists({ roomId })) {
      roomId = generateRoomId();
    }

    const room = await Room.create({
      roomId,
      owner: ownerId,
      participants: [ownerId],
      code: `function hello() {
  console.log("Welcome to SyncSpace");
}
`,
      whiteboard: [],
    });

    return room;
  }

  /**
   * Join Room
   */
  async joinRoom(roomId: string, userId: string) {
    const room = await Room.findOne({ roomId });

    if (!room) {
      throw new Error("Room not found");
    }

    const alreadyJoined = room.participants.some(
      (participant) => participant.toString() === userId
    );

    if (!alreadyJoined) {
      room.participants.push(userId as any);
      await room.save();
    }

    return room;
  }

  /**
   * Get Room
   */
  async getRoom(roomId: string) {
    const room = await Room.findOne({ roomId })
      .populate("owner", "name email avatar")
      .populate("participants", "name email avatar");

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  /**
   * Save Code
   */
  async saveCode(roomId: string, code: string) {
    return Room.findOneAndUpdate(
      { roomId },
      { code },
      {
        new: true,
      }
    );
  }

  /**
   * Save Whiteboard
   */
  async saveWhiteboard(roomId: string, whiteboard: any[]) {
    return Room.findOneAndUpdate(
      { roomId },
      { whiteboard },
      {
        new: true,
      }
    );
  }
}

export default new RoomService();