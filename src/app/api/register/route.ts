// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.json();

        const apiRes = await fetch("https://mktmem-backend.onrender.com/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await apiRes.json();
        console.log("Register response:", data);

        if (!apiRes.ok) {
            return NextResponse.json(
                { message: data.message || "Registration failed", errors: data.errors },
                { status: apiRes.status }
            );
        }

        const registeredUser = data.user;

        if (!registeredUser) {
            return NextResponse.json(
                { message: "Invalid response from auth server" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            user: registeredUser,
            token: data.token
        });
    } catch (error) {
        console.error("API route register error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}