import Background from "../../components/Background";
import PageTransition from "../../components/PageTransition";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import CreateRoomCard from "../../components/dashboard/CreateRoomCard";
import JoinRoomCard from "../../components/dashboard/JoinRoomCard";


const DashboardPage = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <Background />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            w-full
            max-w-7xl
            flex-col
            px-8
            pt-10
            pb-12
          "
        >
          {/* Header */}

          <DashboardHeader />

          {/* Dashboard Content */}

          <div
            className="
              mx-auto
              mt-20
              flex
              w-full
              max-w-5xl
              flex-col
              items-center
            "
          >
            {/* Welcome Card */}

            <div className="w-full max-w-4xl">
              <WelcomeCard />
            </div>

            {/* Cards */}

            <div
              className="
                mt-12
                grid
                w-full
                max-w-4xl
                gap-8
                lg:grid-cols-2
              "
            >
                
              <CreateRoomCard />

              <JoinRoomCard />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;