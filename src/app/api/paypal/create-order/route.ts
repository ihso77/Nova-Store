import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount, description } = await request.json();

        // In a real app, you would call PayPal API here to create an actual order
        // For now, we return a mock ID as the client-side has a fallback
        // but this stops the 404 and allows the flow to continue

        return NextResponse.json({
            id: "PAYPAL_ORDER_" + Math.random().toString(36).substring(7),
            status: "CREATED"
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
