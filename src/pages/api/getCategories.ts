import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  categories: Category[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   const categories = await sanityClient.fetch();
}
