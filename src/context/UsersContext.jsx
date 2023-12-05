import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth, database } from "../../db/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref, onValue } from "firebase/database";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authorizedUsers, setAuthorizedUsers] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const registerUser = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const fetchAuthorizedUsers = async () => {
    const authUsersRef = ref(database, "/authorizedUsers");
    onValue(
      authUsersRef,
      (snapshot) => {
        const authorizedUsers = snapshot.val();
        setAuthorizedUsers(authorizedUsers);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  useEffect(() => {
    fetchAuthorizedUsers();
  }, []);

  useEffect(() => {
    if (user !== undefined && authorizedUsers !== undefined) {
      setIsAuthorized(!!(user && authorizedUsers[user.uid]));
      setIsLoading(false);
    }
  }, [user, authorizedUsers]);

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
        fetchAuthorizedUsers,
        authorizedUsers,
        isAuthorized,
        isLoading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
