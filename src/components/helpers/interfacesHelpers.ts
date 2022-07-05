import { User, UserCredential } from "firebase/auth"
import { Dispatch, ReactElement, SetStateAction } from "react"

export interface IAuthContextProps extends IChildrenProps {
    get currentUser(): User | null
    get loading(): boolean
    get setLoading(): Dispatch<SetStateAction<boolean>>
    signup?: () => PromiseConstructor,
    login?: () => Promise<UserCredential>,
    logout: () => Promise<void>,
    signInWithGoogle: () => Promise<UserCredential>,
    signInWithFacebook?: () => Promise<UserCredential>,
    ifNewCreateUserInFirestoreDatabase: (cred : UserCredential) => Promise<void>,
}

export interface IButtonProps {
    to?: string
    get title(): string 
    get color() : string
    func?: () => void
    setter?: Dispatch<SetStateAction<string[]>>
}

export interface IChildrenProps {
    children?: ReactElement
}

export interface ICurrentUserProps extends User {
    // photo: string,
    // date: string,
}

export interface ILoginProps {
    get withWhat(): string
    get setAuthing(): Dispatch<SetStateAction<boolean>>
}

export interface IHomePageNavLinkProps {
    get to(): string | null
    get title(): string
    get css(): string
}

export interface IMathsStateProps {
    get mode(): string | null;
    get target(): number | null;
    get time(): number | null;
    get spanMessage(): string | null;
}