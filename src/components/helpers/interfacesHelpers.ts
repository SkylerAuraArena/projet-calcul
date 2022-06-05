import { User, UserCredential } from "firebase/auth";
import { ReactElement } from "react";

export interface IAuthContextProps extends IChildrenProps {
    currentUser: User | null,
    loading: boolean,
    signup?: () => PromiseConstructor,
    login?: () => Promise<UserCredential>,
    logout: () => Promise<void>,
    signInWithGoogle: () => Promise<UserCredential>,
    signInWithFacebook?: () => Promise<UserCredential>,
    ifNewCreateUserInFirestoreDatabase: (cred : UserCredential) => Promise<void>,
}

export interface IButtonProps {
    get title(): string 
    get color() : string
    get func(): () => void
}

export interface IChildrenProps {
    children?: ReactElement,
}

export interface ICurrentUserProps extends User {
    // photo: string,
    // date: string,
}

export interface ILoginProps {
    get withWhat(): string
}