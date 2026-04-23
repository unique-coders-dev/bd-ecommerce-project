import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user.role !== "admin" && session.user.role !== "super-admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
    try {
      const session = await auth();
      if (!session || (session.user.role !== "admin" && session.user.role !== "super-admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
  
      const { id, status } = await req.json();
  
      const updated = await prisma.contactMessage.update({
        where: { id },
        data: { status },
      });
  
      return NextResponse.json(updated);
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
