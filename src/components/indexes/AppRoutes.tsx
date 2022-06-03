import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import App from "../../App";
import AuthRoute from "../access/AuthRoute";
import DisconnectedRoute from "../access/DisconnectedRoute";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
// import ConfidentialityPoliticsPage from "../../pages/ConfidentialityPoliticsPage";
// import Error404 from "../../pages/ErrorPage";
// import Friends from "../../pages/FriendsPage";
// import LandingPage from "../../pages/LandingPage";
// import ProfilePage from "../../pages/ProfilePage";
// import SignAndLogPage from "../../pages/SignAndLogPage";
// import Wishes from "../../pages/WishesPage";

const AppRoutes: FC = () => {

    const UnprotectedPages = (
        <>
            <Route index element={<LandingPage />} />
            {/* <Route index element={<LandingPage />} />
            <Route path="login" element={<SignAndLogPage type="log" />} />
            <Route path="signup" element={<SignAndLogPage type="sign" />} />
            <Route path="dataProtectionDisconnected" element={<ConfidentialityPoliticsPage />} /> */}
        </>
    )
    const RestrictedAccessPages = (
        <>
            <Route path="home" element={<Homepage />} />
            {/* <Route path="home" element={<LandingPage />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wishes" element={<Wishes />} />
            <Route path="dataProtectionLoggedIn" element={<ConfidentialityPoliticsPage />} /> */}
        </>
    )

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    path="/"
                    element={
                        <DisconnectedRoute>
                            <Outlet />
                        </DisconnectedRoute>
                    }
                >
                    {UnprotectedPages}
                </Route>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <Outlet />
                        </AuthRoute>
                    }
                >
                    {RestrictedAccessPages}
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes