import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import useRefresherToken from '../hooks/useRefresher';
import { Outlet } from 'react-router-dom';

export default function PersistedRoute() {
    const [isLoading, setLoading] = useState(true)
    const  {user, accessToken,  setUser, setAccessToken} = useAuth();
    const refresh = useRefresherToken();

    useEffect(() => {
        const verifyRefresh = async () => {
        try {
            if (!user || !accessToken) {
             await refresh(); // refresh sets auth internally
            }
        } catch {
            setUser(null); // logout
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
        };

        verifyRefresh();
    }, []);

    if (isLoading) return <p>Loading session...</p>; // ensures ProtectedRoute mounts **after** refresh
    return <Outlet />; // will mount ProtectedRoute here
}
