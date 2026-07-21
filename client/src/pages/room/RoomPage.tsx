import { useParams } from "react-router-dom";

import Background from "../../components/Background";
import PageTransition from "../../components/PageTransition";

import Whiteboard from "../../components/room/Whiteboard";
import EditorPanel from "../../components/room/EditorPanel";
import UsersPanel from "../../components/room/UsersPanel";
import RemoteCursors from "../../components/room/RemoteCursors";

import useSocket from "../../hooks/useSocket";
import useCursorSync from "../../hooks/useCursorSync";
import useRoomState from "../../hooks/useRoomState";

const RoomPage = () => {
  const { roomId = "" } = useParams();

  useSocket(roomId);
  useCursorSync(roomId);
  useRoomState(roomId);

  return (
    <PageTransition>
      <RemoteCursors />

      <div className="relative h-screen overflow-hidden">
        <Background />

        <div className="relative z-10 flex h-full flex-col">
          <header className="flex h-20 items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-xl">
            <div>
              <h1 className="text-2xl font-bold text-white">
                SyncSpace
              </h1>

              <p className="text-sm text-slate-400">
                Room : {roomId}
              </p>
            </div>

            <div className="rounded-xl bg-green-500/20 px-4 py-2 font-medium text-green-400">
              Connected
            </div>
          </header>

          <main className="flex flex-1 overflow-hidden">
            <section className="w-[40%] border-r border-white/10">
              <Whiteboard roomId={roomId} />
            </section>

            <section className="w-[40%] border-r border-white/10">
              <EditorPanel roomId={roomId} />
            </section>

            <UsersPanel />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default RoomPage;