import Login from '../components/Login.jsx';
import Register from "../components/Register.jsx";
import { useState } from "react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? (
        <Login>
          <div className="text-center mt-4">
            <button
              className="text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] font-semibold transition-colors hover:underline decoration-2 underline-offset-2"
              onClick={() => setShowLogin(false)}
            >
              Don't have an account? Sign up
            </button>
          </div>
        </Login>
      ) : (
        <Register>
          <div className="text-center mt-4">
            <button
              className="text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] font-semibold transition-colors hover:underline decoration-2 underline-offset-2"
              onClick={() => setShowLogin(true)}
            >
              Already have an account? Sign in
            </button>
          </div>
        </Register>
      )}
    </div>
  );
};

export default Index;
