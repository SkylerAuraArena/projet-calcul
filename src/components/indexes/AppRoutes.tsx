import { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import App from "../../App";
import AuthRoute from "../access/AuthRoute";
import DisconnectedRoute from "../access/DisconnectedRoute";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import MathsPage from "../pages/MathsPage";

const AppRoutes: FC = () => {

    const UnprotectedPages = (
        <>
            <Route index element={<LoginPage />} />
        </>
    )
    const RestrictedAccessPages = (
        <>
            <Route path="accueil" element={<Homepage />} />
            <Route path="maths" element={<MathsPage />} >
                <Route path=":competence" element={<MathsPage />} />
            </Route>
            <Route path="francais" element={<Homepage />} />
            <Route path="dactylo" element={<Homepage />} />
            <Route path="langues" element={<Homepage />} />
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
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes