import { useParams } from "react-router-dom";

import Background from "../../components/Background";
import PageTransition from "../../components/PageTransition";

import Whiteboard from "../../components/room/Whiteboard";
import EditorPanel from "../../components/room/EditorPanel";

const RoomPage = () => {
  const { roomId } = useParams();

  return (
    <PageTransition>
      <div className="relative h-screen overflow-hidden">
        <Background />

        <div className="relative z-10 flex h-full flex-col">

          {/* Header */}

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

          {/* Workspace */}

          <main className="flex flex-1">

            <section className="w-1/2 border-r border-white/10">
              <Whiteboard />
            </section>

            <section className="w-1/2">
              <EditorPanel />
            </section>

          </main>

        </div>
      </div>
    </PageTransition>
  );
};

export default RoomPage;