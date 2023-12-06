import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../../db/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();
  const registerUser = async ({ name, email, password }) => {
    console.log(name, email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error al registrar el usuario:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const registeredUser = await signInWithPopup(auth, provider);
    const { user } = registeredUser;
    setUser(user);
  };

  const loginUser = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  const handleSignOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
