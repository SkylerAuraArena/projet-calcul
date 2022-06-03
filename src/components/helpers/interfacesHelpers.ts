import { User } from "firebase/auth";
import { ReactElement } from "react";

export interface IAuthContextProps extends IChildrenProps {
    currentUser: User | null,
    loading: boolean,
    signup?: () => PromiseConstructor,
    login?: () => PromiseConstructor,
    logout?: () => PromiseConstructor,
    signInWithGoogle?: () => PromiseConstructor,
    signInWithFacebook?: () => PromiseConstructor,
}

export interface IButtonProps {
    get title(): string 
    get color() : string
}

export interface IChildrenProps {
    children?: ReactElement,
}

export interface ICurrentUserProps extends User {
    // photo: string,
    // date: string,
}