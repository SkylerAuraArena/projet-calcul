import { FC } from 'react';
import { IChildrenProps as IProvidersIndexProps } from '../helpers/interfacesHelpers'
import AuthContextProvider from "../../contexts/AuthContext"
import MainContextProvider from "../../contexts/MainContext"
// import FirebaseConnectionProvider from "../../contexts/FirebaseConnectionContext"

const ProvidersIndex: FC<IProvidersIndexProps> = ({ children }) => {

    return (
        <AuthContextProvider>
            <MainContextProvider>
                {/* <FirebaseConnectionProvider> */}
                {children}
                {/* </FirebaseConnectionProvider> */}
            </MainContextProvider>
        </AuthContextProvider>
    )
}

export default ProvidersIndex