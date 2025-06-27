// app/api/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Authorization token required' },
                { status: 401 }
            );
        }

        const token = authHeader.replace('Bearer ', '');

        const apiRes = await fetch("https://mktmem-backend.onrender.com/api/users/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
        });

        const data = await apiRes.json();

        if (!apiRes.ok) {
            return NextResponse.json(
                { message: data.message || "Logout failed", errors: data.errors },
                { status: apiRes.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: data.message || "Successfully logged out"
        });
    } catch (error) {
        console.error("API route logout error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}