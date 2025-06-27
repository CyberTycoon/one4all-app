// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE = 'https://mktmem-backend.onrender.com/api/users/profile/';

export async function GET(req: NextRequest) {
    try {
        const res = await fetch(BACKEND_BASE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                cookie: req.headers.get('cookie') || '',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ message: data.message, errors: data.errors }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Profile GET error:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(BACKEND_BASE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                cookie: req.headers.get('cookie') || '',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ message: data.message, errors: data.errors }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Profile PUT error:', err);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
