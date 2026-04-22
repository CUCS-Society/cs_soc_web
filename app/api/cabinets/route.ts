import { prisma } from "@/lib/prisma";

export async function GET() {
  const cabinets = await prisma.cabinet.findMany({
    orderBy: { editionNumber: "asc" },
  });

    return new Response(JSON.stringify(cabinets), {
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request) {
    try{
        const body = await request.json();

        const { zhName, enName, editionNumber, year, iconSrc, htmlhref } = body;

        // convert editionNumber and year to numbers if they are strings
        const editionNumberNum = typeof editionNumber === "string" ? parseInt(editionNumber, 10) : editionNumber;
        const yearNum = typeof year === "string" ? parseInt(year, 10) : year;

        if (!zhName || !enName || !editionNumber || !year || !iconSrc || !htmlhref) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }


        if (typeof zhName !== "string" || typeof enName !== "string" || typeof iconSrc !== "string" || typeof htmlhref !== "string") {
            return new Response(JSON.stringify({ error: "zhName, enName, iconSrc, and htmlhref must be strings" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (editionNumberNum <= 0 || yearNum <= 0) {
            return new Response(JSON.stringify({ error: "editionNumber and year must be positive integers" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (zhName.trim() === "" || enName.trim() === "" || iconSrc.trim() === "" || htmlhref.trim() === "") {
            return new Response(JSON.stringify({ error: "zhName, enName, iconSrc, and htmlhref cannot be empty" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }


        const newCabinet = await prisma.cabinet.create({
            data: {
                zhName,
                enName,
                editionNumber: editionNumberNum,
                year: yearNum,
                iconSrc,
                htmlhref,
            },
        });

        return new Response(JSON.stringify(newCabinet), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating cabinet:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}