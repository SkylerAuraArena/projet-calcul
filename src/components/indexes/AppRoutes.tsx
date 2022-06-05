import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import App from "../../App";
import AuthRoute from "../access/AuthRoute";
import DisconnectedRoute from "../access/DisconnectedRoute";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
// import Friends from "../../pages/FriendsPage";
// import LandingPage from "../../pages/LandingPage";
// import ProfilePage from "../../pages/ProfilePage";
// import SignAndLogPage from "../../pages/SignAndLogPage";
// import Wishes from "../../pages/WishesPage";

const AppRoutes: FC = () => {

    const UnprotectedPages = (
        <>
            <Route index element={<LoginPage />} />
            {/*
            <Route path="login" element={<SignAndLogPage type="log" />} />
            <Route path="signup" element={<SignAndLogPage type="sign" />} />
            */}
        </>
    )
    const RestrictedAccessPages = (
        <>
            <Route path="accueil" element={<Homepage />} />
            {/*
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wishes" element={<Wishes />} />
            */}
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