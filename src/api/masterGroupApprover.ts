import { fakeApi } from '@axios';
export interface MasterGroupApprover {
  id: string;
  value: string;
  checked?: boolean | undefined;
}

export const masterGroupApproverData: MasterGroupApprover[] = [
  { id: 'Account release PR', value: 'Account release PR' },
  { id: 'AVet Drug release PR', value: 'Vet Drug release PR' },
  {id: 'Edit PO',value: 'Edit PO'},
  { id: 'PO Approver', value: 'PO Approver' },
];

// export const getPlant: () => Promise<Plant[]> = async () => {
//   try {
//     const response = await fakeApi.get<Plant[]>(`/api/plant`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error; 
//   }
// };

export function getMasterGroupApprover(): Promise<MasterGroupApprover[]> {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(masterGroupApproverData);
        }, 500);
    })
}
