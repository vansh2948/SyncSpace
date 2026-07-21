const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const ROOM_ID_LENGTH = 8;

const generateRoomId = (): string => {
  let roomId = "";

  for (let i = 0; i < ROOM_ID_LENGTH; i++) {
    const randomIndex = Math.floor(
      Math.random() * CHARACTERS.length
    );

    roomId += CHARACTERS[randomIndex];
  }

  return roomId;
};

export default generateRoomId;