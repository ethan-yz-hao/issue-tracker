import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, {params}: Props) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue) {
        return NextResponse.json({error: "Invalid issue"}, {status: 404});
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(params.id)},
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, {params}: Props) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue) {
        return NextResponse.json({error: "Invalid issue"}, {status: 404});
    }
    await prisma.issue.delete({
        where: {id: parseInt(params.id)}
    });

    return NextResponse.json({});
}