import type { NextApiRequest, NextApiResponse } from 'next';

interface PurchasingGroup {
    id: string;
    value: string;
    checked?: boolean | undefined;
}

const purchasingGroupData: PurchasingGroup[] = [
    { id: '760 - ธุรการ-ตะวันออก1', value: '760 - ธุรการ-ตะวันออก1' },
    { id: '761 - ธุรการ-ตะวันออก2', value: '761 - ธุรการ-ตะวันออก2' },
    { id: '762 - ธุรการ-ตะวันตก', value: '762 - ธุรการ-ตะวันตก' },
    { id: '763 - ธุรการ-ใต้2', value: '763 - ธุรการ-ใต้2' },
    { id: '258 - จัดซื้อ CTF', value: '258 - จัดซื้อ CTF' },
    { id: '834 - ซีพีฟู้ดมาร์เก็ต', value: '834 - ซีพีฟู้ดมาร์เก็ต' },
    { id: '980 - Ordering Center', value: '980 - Ordering Center' },
    { id: '981 - Vet&Meat', value: '981 - Vet&Meat' },
    { id: 'Ordering', value: 'Ordering' },
    { id: 'B2B', value: 'B2B' },
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<PurchasingGroup[]>,
  ) {
    const { parentPurchasingGroup } = req.query;
    res.status(200).json(purchasingGroupData);
  }
  