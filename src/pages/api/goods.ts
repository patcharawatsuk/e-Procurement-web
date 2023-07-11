// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Good {
    id: string;
    name: string;
    price?: number;
}

const goods: Good[] = [
    { id: 'applePhone1', name: 'iPhone 1', price: 2000000 },
    { id: 'applePhone2', name: 'iPhone14', price: 40000 },
    { id: 'appleLaptop1', name: 'MacBook Pro M2', price: 80000 },
    { id: 'applePC', name: 'iMac', price: 23000 },
    { id: 'apple', name: 'Apple', price: 20 },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Good[]>,
) {
  res.status(200).json(goods);
}
