import {NextRequest, NextResponse} from "next/server";
import {ValidationSchemas} from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, {params}: Props) {
    const body = await request.json();
    const validation = ValidationSchemas.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue) {
        return NextResponse.json("Invalid issue", {status: 404});
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(params.id)},
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json(updatedIssue);
}