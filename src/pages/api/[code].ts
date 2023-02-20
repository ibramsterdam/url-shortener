import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only GET request are allowed!",
    });
  }

  const { code } = req.query;

  if (typeof code == "string") {
    const result = await prisma.$transaction(async (tx) => {
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });

      if (!url) return null;

      await tx.urlAnalytic.update({
        where: {
          urlId: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      return url;
    });

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        error: {
          message: "Invalid short url code!",
        },
        data: null,
      });
    }

    return res.redirect(result.originalUrl);
  }
}
