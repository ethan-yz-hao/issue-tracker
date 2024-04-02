'use client'
import {PropsWithChildren} from "react";
import {SessionProvider} from "next-auth/react";

const AuthProvider = ({children}: PropsWithChildren) => {
    return (
        <div>
            <SessionProvider>{children}</SessionProvider>
        </div>
    );
};

export default AuthProvider;