import { useState, useEffect } from "react";
import firebase from "../firebase";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    // Quand le component est démonté, on supprime l'objet user
    return () => unsubscribe();
  }, []);

  return authUser;
};

export default useAuth;
