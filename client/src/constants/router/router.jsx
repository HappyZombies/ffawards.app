import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import { ROUTES } from "./route";
import Nav from "../../components/Nav";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            {ROUTES.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Route>
    )
);


function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}
