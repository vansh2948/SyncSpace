export interface JoinRoomPayload {
  roomId: string;
  userId: string;
  userName: string;
}

export interface LeaveRoomPayload {
  roomId: string;
  userId: string;
}

export interface UserPresence {
  userId: string;
  userName: string;
  socketId: string;
}

export interface RoomState {
  roomId: string;
  users: UserPresence[];
}