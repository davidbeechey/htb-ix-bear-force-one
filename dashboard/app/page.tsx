"use client"
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>
    
    if (user) {
        return <div>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        </div>
    }
    return <a href="/api/auth/login">Login</a>;
}
