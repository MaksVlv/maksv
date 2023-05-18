import React, { useEffect } from "react";
import LoginForm from "@/components/admin/LoginForm"
import { useRouter } from "next/router";


export default function Login() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.push('/admin', '/admin', { locale: "lv" });
        }
    }, []);

    return (
        <LoginForm />
    )
}
