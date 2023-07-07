import type { NextApiRequest, NextApiResponse } from 'next';

interface ParentPurchasingGroup {
  id: string;
  value: {
    parent: string;
    subParents: subParentType[];
  };
}

type subParentType = {
  subParentName: string;
  checked?: boolean;
}

const parentPurchasingGroup: ParentPurchasingGroup[] = [
  {
    id: 'Chesters food / CP Food market',
    value: {
      parent: 'Chesters food / CP Food market',
      subParents: [],
    },
  },
  {
    id: 'Arbor & Ross',
    value: {
      parent: 'Arbor & Ross',
      subParents: [],
    },
  },
  {
    id: 'Ordering / B2B',
    value: {
      parent: 'Ordering / B2B',
      subParents: [{'subParentName': 'Ordering'}, {'subParentName': 'B2B'}],
    },
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  //const { id } = req.query;
  res.status(200).json(parentPurchasingGroup);
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<string[][]>,
// ) {
//   const newLocal = parentPurchasingGroup.flatMap((item) => Object.values(item.value));
//   res.status(200).json(newLocal);
// }

// parentPurchasingGroup.forEach((item) => {
//   item.value.subParent.forEach((subParentItem) => {
//     for (const key in subParentItem) {
//       const checked = subParentItem[key].checked;
//       console.log(`Checked: ${checked}`);
//     }
//   });
// });