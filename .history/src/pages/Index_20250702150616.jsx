import Login from '';
import Register from "./Register.jsx";
import { useState } from "react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      {showLogin ? <Login /> : <Register />}
      <div className="text-center mt-4">
        <button
          className="text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] font-semibold transition-colors hover:underline decoration-2 underline-offset-2"
          onClick={() => setShowLogin((prev) => !prev)}
        >
          {showLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Index;
