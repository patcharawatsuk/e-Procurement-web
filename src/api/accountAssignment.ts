import { fakeApi } from '@axios';
export interface AccountAssignment {
  id: string;
  value: string;
  checked?: boolean | undefined;
}

export const accountAssignmentData: AccountAssignment[] = [
  { id: 'Account Assignment Type A', value: 'Account Assignment Type A' },
  { id: 'Account Assignment Type F', value: 'Account Assignment Type F' },
  {
    id: 'Account Assignment Type S',value: 'Account Assignment Type S',
  },
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

export function getAccountAssignment(): Promise<AccountAssignment[]> {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(accountAssignmentData);
        }, 500);
    })
}
