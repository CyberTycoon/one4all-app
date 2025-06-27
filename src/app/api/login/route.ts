// Updated app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();

        const apiRes = await fetch("https://mktmem-backend.onrender.com/api/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await apiRes.json();
        console.log("Login response:", data);

        if (!apiRes.ok) {
            return NextResponse.json(
                { message: data.message || "Login failed", errors: data.errors },
                { status: apiRes.status }
            );
        }

        const loggedInUser = data.user;

        if (!loggedInUser) {
            return NextResponse.json(
                { message: "Invalid response from auth server" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            user: loggedInUser,
            token: data.token
        });
    } catch (error) {
        console.error("API route login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}