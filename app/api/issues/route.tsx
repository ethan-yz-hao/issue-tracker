import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {validationSchemas} from "@/app/ValidationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = validationSchemas.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});

    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })
    return NextResponse.json(newIssue, {status: 201});
}