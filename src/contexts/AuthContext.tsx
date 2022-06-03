import { useState, useEffect, createContext, useContext, useMemo, useCallback, ReactNode } from "react";
import { auth } from "../firebase-confg";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  signup: () => Promise,
  login: () => Promise,
  logout: () => Promise,
  signInWithGoogle: () => Promise,
  signInWithFacebook: () => Promise,
})

export interface IAuthContextProviderProps{
    children?: ReactNode
}

export default function AuthContextProvider({children} : IAuthContextProviderProps) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AuthCheck()
  }, [auth])
  
  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
        setCurrentUser({
          user: user,
        });
      } else {
        setCurrentUser(user);
      }
  })

//   useEffect(() => {
//     const unsuscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser({
//           user: user,
//         });
//       } else {
//         setCurrentUser(user);
//       }
//     })

//     return () => {
//       unsuscribe()
//     }
//   }, [])

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      setLoading,
    }),
    [
      currentUser,
      loading,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

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


export const useAuth = () => useContext(AuthContext);