import { useNavigate } from "react-router-dom";
import {initializeApp} from "firebase/app";
import { config } from "../config/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";


initializeApp(config.firebaseConfig)
export interface LoginProps {}

const Login: React.FC<LoginProps> = () =>{

  const navigate = useNavigate();
  const auth = getAuth();
  const [authing, setAuthing] = useState(false);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider()).then(response => {
        console.log(response.user.uid);
        navigate("/");
    })
    .catch(error => {
        console.log(error);
        setAuthing(false);
    })
  }




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button 
        onClick={()=>signInWithGoogle()} 
        disabled={authing}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
