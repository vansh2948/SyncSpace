import Background from "../../components/Background";
import PageTransition from "../../components/PageTransition";
import AuthCard from "../../components/auth/AuthCard";
import FloatingCard from "../../components/auth/FloatingCard";

const AuthPage = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <Background />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <FloatingCard>
            <AuthCard />
          </FloatingCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;