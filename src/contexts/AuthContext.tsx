import { useState, useEffect, createContext, useContext, useMemo, useCallback, FC } from "react";
import { IChildrenProps, IAuthContextProps, ICurrentUserProps } from '../components/helpers/interfacesHelpers'
import { auth } from "../firebase-confg";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext<IAuthContextProps | null>(null)

const AuthContextProvider: FC<IChildrenProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUserProps | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    authCheck()

    return () => {
      authCheck
    }
  }, [auth])
  
  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        // const photo: string = "Photo"
        // const date: string = "Photo"
        // const newUser: ICurrentUserProps = {...user, photo, date}
        const newUser: ICurrentUserProps = {...user}
        setCurrentUser(newUser);
      } else {
        setCurrentUser(user);
      }
  })

  const signInWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  const contextValues: IAuthContextProps = useMemo(
    () => ({
      currentUser,
      loading,
      setLoading,
      signInWithGoogle,
      logout,
    }),
    [
      currentUser,
      loading,
    ]
  )

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

// export default function AuthContextProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsuscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log(typeof user)
//         // const imgSrc = "//www.gravatar.com/avatar/28d8a1def414df109d3cdc226b381255?s=40&r=g&d=monsterid"
//         // const title = user?.email === "admin@admin.com" ? "Maître des clefs" : "Participant"
//         // const pseudo =  `${user?.email.substring(0, user?.email.indexOf("@")).substring(0,1).toUpperCase()}${user?.email.substring(0, user?.email.indexOf("@")).substring(1,)}`
//         setCurrentUser({
//           user: user,
//           // pseudo: pseudo,
//           // title: title,
//           // imgSrc: imgSrc,
//         });
//       } else {
//         setCurrentUser(user);
//       }
//       // setLoading(false)
//     });

//     return () => {
//       unsuscribe();
//     };
//   }, []);

//   const signupWithMail = useCallback((email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }, []);

//   const loginWithMail = useCallback((email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   }, []);

//   const signInWithGoogle = useCallback(() => {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(auth, provider);
//   }, []);

//   const signInWithFacebook = useCallback(() => {
//     const provider = new FacebookAuthProvider();
//     return signInWithPopup(auth, provider);
//   }, []);

//   const logout = useCallback(() => {
//     return signOut(auth);
//   }, []);

//   const value = useMemo(
//     () => ({
//       currentUser,
//       loading,
//       setLoading,
//       signupWithMail,
//       loginWithMail,
//       signInWithGoogle,
//       signInWithFacebook,
//       logout,
//     }),
//     [
//       currentUser,
//       loading,
//       signupWithMail,
//       loginWithMail,
//       signInWithGoogle,
//       signInWithFacebook,
//       logout,
//     ]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé dans le context adéquat"
    );
  }

  return context;
};