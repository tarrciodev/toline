import { setAccountTo } from "@/actions/users/set-acount-to";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userType } = await request.json();

    await setAccountTo(userType);

    return NextResponse.json({ message: "Cookie set", userType });
}
