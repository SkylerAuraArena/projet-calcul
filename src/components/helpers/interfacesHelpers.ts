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
export interface IMainContextProps extends IChildrenProps {
    get mainContextState(): IMainContextStateProps;
    get mainContextDispatch(): Dispatch<Partial<IMainContextStateProps>>;
}

export interface IMainContextStateProps {
    get appTitleText(): string;
    get displayTrainingTitle(): boolean;
    get trainingSpanText(): string;
}

export interface IButtonProps {
    ref?: any
    to?: string
    get title(): string 
    get color() : string
    func?: (btnTxt: string) => void
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
    get to(): string
    get title(): string
    get css(): string
    func?: (btnTxt: string) => void
}

export interface IMathsTrainingStateProps {
    get mode(): string;
    get limit(): number | null;
    get timer(): number | null;
    get timeLeft(): number | null;
    get spanMessage(): string[];
    get defaultSpanCss(): string;
    get spanCss(): string;
    get displayTimer(): boolean;
    get startTimer(): boolean;
    get skill(): string;
    get randomSkill(): string;
    get target(): number | null;
    get lastTarget(): number | null;
    get securityRenderCheck(): number | null;
    get param1(): number | null;
    get param2(): number | null;
    get btn1Txt(): number;
    get btn2Txt(): number;
    get btn3Txt(): number;
    get questionsCounter(): number;
    get goodAnswersCounter(): number;
}
export interface ICountdownBarProps {
    get timer(): number;
    get startTimer(): boolean;
    dispatch: Dispatch<Partial<IMathsTrainingStateProps>>
}

export interface ITrainingOptionsSettingsProps {
    get text(): string;
    get css(): string;
}
export interface IMathsAnswerProps {
    get parentState(): IMathsTrainingStateProps; 
    parentDispatch: Dispatch<Partial<IMathsTrainingStateProps>>;
    setSpanMsg: (state: IMathsTrainingStateProps, dispatch: Dispatch<Partial<IMathsTrainingStateProps>>,point: number) => void;
}