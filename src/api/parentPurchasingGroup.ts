import { fakeApi } from '@axios';

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

export interface ParentPurchasingGroup {
  id: string;
  value: {
    parent: string;
    subParents: SubParentType[];
  };
}

export type SubParentType = {
  subParentName: string;
  checked?: boolean;
}

export function getParentPurchasingGroup(): Promise<ParentPurchasingGroup[]> {
  return new Promise((resolve, reject) => {
      setTimeout(function() {
          resolve(parentPurchasingGroup);
      }, 500);
  })
}


// export const getParentPurchasingGroup: () => Promise<ParentPurchasingGroup[]> = async () => {
//     try {
//       const response = await fakeApi.get<ParentPurchasingGroup[]>(`/api/parentPurchasingGroup`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error; 
//     }
// };