import { User } from "firebase/auth";
import { ReactNode } from "react";

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
    title: string,
    color: string,
}

export interface IChildrenProps {
    children?: ReactNode,
}

export interface IEmptyProps {}