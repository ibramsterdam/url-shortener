import type { NextApiRequest, NextApiResponse } from "next";
import { isWebUri } from "valid-url";
import { z } from "zod";
import { prisma } from "~/server/db";
import { generateShortLink } from "~/utils/generateShortLink";

const RequestDataSchema = z.object({
  url: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only POST request are allowed!",
    });
  }
  const host = req.headers.host;

  if (!host) return;
  const { shortCode, shortUrl } = generateShortLink(host);

  const { url } = RequestDataSchema.parse(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!isWebUri(url)) {
    return res.status(400).json({
      statusCode: 400,
      error: {
        message: "Invalid Url",
      },
      data: null,
    });
  }
  const result = await prisma.$transaction(async (tx) => {
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    const newUrl = await tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    await tx.urlAnalytic.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: newUrl.id,
          },
        },
      },
    });

    return newUrl;
  });

  return res.status(200).json({
    statusCode: 200,
    error: null,
    data: {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
      code: result.urlCode,
    },
  });
}
