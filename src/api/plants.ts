import { fakeApi } from '@axios';
export interface Plant {
  id: string;
  value: string;
  checked?: boolean | undefined;
}

export const plantListData: Plant[] = [
  { id: '1000 BKP วัตถุดิบ', value: '1000 BKP วัตถุดิบ' },
  { id: '1001 CPFTH บริหารครบ', value: '1001 CPFTH บริหารครบ' },
  {
    id: '1002 CPFTH กท.สบ. - สนง.ไก่กระทง',
    value: '1002 CPFTH กท.สบ. - สนง.ไก่กระทง',
  },
  { id: '1003 CPFTH บริหารครบ', value: '1003 CPFTH บริหารครบ' },
  {
    id: '1004 CPFTH กท.สบ. - สนง.ไก่กระทง',
    value: '1004 CPFTH กท.สบ. - สนง.ไก่กระทง',
  },
  {
    id: '1005 CPFTH กท.สบ. - สนง.ไก่กระทง',
    value: '1005 CPFTH กท.สบ. - สนง.ไก่กระทง',
  },
  { id: '1006 XXXXXX', value: '1006 XXXXXX' },
  { id: '1007 XXXXXX', value: '1007 XXXXXX' },
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

export function getPlant(): Promise<Plant[]> {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(plantListData);
        }, 500);
    })
}
