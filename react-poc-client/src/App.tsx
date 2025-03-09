import React, { useEffect, useState } from 'react';
import { login, handleCallback, getUser, logout } from './authService';

const App: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    const getUserClick = () => {

        handleCallback()
            .then(() => {
                console.log("Getting user...");
                getUser().then(setUser)
            })
            .catch((e) => {
                console.log("Error on get user ... attempting to log and redirect to login...");
                console.error(e);
                console.log("Redirecting to login...");
                //login()
            });
    }
/*
    useEffect(() => {
        // Handle the redirect callback and get the user data
        if (!user)
        {
            handleCallback()
                .then(() => {
                    console.log("Getting user...");
                    getUser().then(setUser)
                })
                .catch((e) => {
                    console.error(e);
                    console.log("Redirecting to login...");
                    login()
                });
        }
    }, [user]);
   */
/*
    if (!user)
    {
        handleCallback()
            .then(() => {
                console.log("Getting user...");
                getUser().then(setUser)
            })
            .catch((e) => {
                console.error(e);
                console.log("Redirecting to login...");
                login()
            });
    }
*/

    if (user)
    {
        console.log("User: ", user);
    }

    return (
        <div>
            <h1>React OpenIddict POC with Vite and TypeScript</h1>
            {!user ? (
                <>
                <button onClick={login}>Login</button>
                <button onClick={getUserClick}>Get User</button>
                </>
            ) : (
                <div>
                    <p>Welcome, {user?.profile?.sub}!</p>
                    <p>profile.sub: {user?.profile?.sub}</p>
                    <p>Access Token: {user?.access_token}</p>
                    <p>ID Token: {user?.id_token}</p>
                    <p>Refresh Token: {user?.refresh_token}</p>
                    <p>expires at: {user?.expires_at}</p>
                    <p>scope: {user?.scope}</p>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default App;