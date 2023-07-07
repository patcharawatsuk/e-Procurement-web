// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Plant {
    id: string;
    value: string;
    checked?: boolean | undefined;
}

const plantListData: Plant[] = [
    { id: '1000 BKP วัตถุดิบ', value: '1000 BKP วัตถุดิบ' },
    { id: '1001 CPFTH บริหารครบ', value: '1001 CPFTH บริหารครบ' },
    { id: '1002 CPFTH กท.สบ. - สนง.ไก่กระทง', value: '1002 CPFTH กท.สบ. - สนง.ไก่กระทง' },
    { id: '1003 CPFTH บริหารครบ', value: '1003 CPFTH บริหารครบ' },
    { id: '1004 CPFTH กท.สบ. - สนง.ไก่กระทง', value: '1004 CPFTH กท.สบ. - สนง.ไก่กระทง' },
    { id: '1005 CPFTH กท.สบ. - สนง.ไก่กระทง', value: '1005 CPFTH กท.สบ. - สนง.ไก่กระทง' },
    { id: '1006 XXXXXX', value: '1006 XXXXXX' },
    { id: '1007 XXXXXX', value: '1007 XXXXXX' },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plant[]>,
) {
  res.status(200).json(plantListData);
}
