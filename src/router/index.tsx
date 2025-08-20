import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";

const SignIn = lazy(() => import('../modules/auth/pages'));
const AdminLayout = lazy(() => import('../modules/layout'));
const Users = lazy(() => import('../modules/users/pages'));
const Countries = lazy(() => import('../modules/countries/pages'));
const Events = lazy(() => import('../modules/events/pages'));
const Members = lazy(() => import('../modules/members/pages'));
import  Loading  from "../components/loadable";
import NotFound from '../components/notfound';

const Index: React.FC = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route index element={<SignIn />} />
                <Route path="admin-layout" element={<AdminLayout />}>
                    <Route index element={<Users />} />
                    <Route path="countries" element={<Countries />} />
                      <Route path="members" element={<Members />} />
                    <Route path="events" element={<Events />} />
                   
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default Index;
