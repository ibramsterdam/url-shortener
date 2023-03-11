/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// run
//--compiler-options {\"module\":\"CommonJS\"} migration.ts

// async function main() {
//   const list = await prisma.url.findMany({
//     where: {
//       originalUrl: { contains: "loader2.php?sid=getInAttack&user" },
//     },
//   });

//   if (list) {
//     let index = 0;
//     console.log(list.length);
//     for (const obj of list) {
//       //   console.log(obj);
//       const start = obj.originalUrl.indexOf("user2ID=$") + 9;
//       const userId = obj.originalUrl.substring(start);
//       const url =
//         "https://www.torn.com/loader.php?sid=attack&user2ID=" + userId;
//       await prisma.url.update({
//         where: {
//           id: obj.id,
//         },
//         data: {
//           originalUrl: url,
//         },
//       });

//       console.log(index);
//       index++;
//     }
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
// if (match) {
//   const url =
//     "https://www.torn.com/loader.php?sid=attack&user2ID=" +
//     match[0].toString();
//   console.log(url);
// }
// const coolie = await prisma.url.update({
//   where: {
//     id: "1a2d5067-8ce8-48c9-85f0-de5d8a4bbb93",
//   },
//   data: {
//     originalUrl: url,
//   },
// });

//     // console.log(coolie);
//   }

//   //   if (test) {
//   //     await prisma.url.delete({
//   //       where: {
//   //         id: test.id,
//   //       },
//   //     });
//   //   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
