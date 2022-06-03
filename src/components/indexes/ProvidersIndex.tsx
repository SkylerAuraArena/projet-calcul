import { FC } from 'react';
import { IChildrenProps as IProvidersIndexProps } from '../helpers/interfacesHelpers'
import AuthContextProvider from "../../contexts/AuthContext"
// import FirebaseConnectionProvider from "../../contexts/FirebaseConnectionContext"

const ProvidersIndex: FC<IProvidersIndexProps> = ({ children }) => {

    return (
        <AuthContextProvider>
            {/* <FirebaseConnectionProvider> */}
                {children}
            {/* </FirebaseConnectionProvider> */}
        </AuthContextProvider>
    )
}

export default ProvidersIndex