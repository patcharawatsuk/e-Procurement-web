import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    name: string;
    surname: string;
}

const user: User = {
    name: 'John',
    surname: 'Doe'
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>,
  ) {
    res.status(200).json(user);
  }
  
