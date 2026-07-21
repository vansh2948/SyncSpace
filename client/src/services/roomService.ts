import api from "./api";

export interface RoomResponse {
  success: boolean;
  message?: string;
  room: {
    _id: string;
    roomId: string;
    owner: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
  };
}

class RoomService {
  async createRoom(): Promise<RoomResponse> {
    const { data } = await api.post("/rooms/create");

    return data;
  }

  async joinRoom(roomId: string): Promise<RoomResponse> {
    const { data } = await api.post("/rooms/join", {
      roomId,
    });

    return data;
  }

  async getRoom(roomId: string): Promise<RoomResponse> {
    const { data } = await api.get(`/rooms/${roomId}`);

    return data;
  }
}

export default new RoomService();