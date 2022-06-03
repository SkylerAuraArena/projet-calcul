import { FC } from 'react'
import { IChildrenProps as IRequireAuthProps } from '../helpers/interfacesHelpers'
import { useAuth } from '../../contexts/AuthContext'
import { useLocation, Navigate } from "react-router-dom"

const DisconnectedRoute: FC<IRequireAuthProps> = ({ children }) => {
    const currentUser = useAuth()
    const location = useLocation()

    if (currentUser?.currentUser) {
        // Redirect them to the /home page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/home" state={{ from: location }} replace />
    }

    return (
        <>{ children }</>
    )
}

export default DisconnectedRoute