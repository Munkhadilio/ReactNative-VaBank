export interface dataProps {
  id: string;
  value: string;
  valid: string;
  number: string;
  name: string;
  typeCard: string;
  backgroundColor: string[];
}

export const dataCard: dataProps[] = [
  {
    id: '0',
    value: '$ 2.235',
    valid: '12/22',
    number: '5456',
    name: 'Margo Lepski',
    typeCard: 'VaBank Premium',
    backgroundColor: ['rgba(252, 255, 223, 1)', 'rgba(241, 254, 135, 1)'],
  },
  {
    id: '1',
    value: '$ 6.597',
    valid: '05/28',
    number: '3465',
    name: 'Margo Lepski',
    typeCard: 'VaBank Credit',
    backgroundColor: ['rgba(234, 234, 234, 1)', 'rgba(178, 208, 206, 1)'],
  },
  {
    id: '2',
    value: '$ 4.258',
    valid: '01/23',
    number: '4552',
    name: 'Margo Lepski',
    typeCard: 'VaBank Deposit',
    backgroundColor: ['rgba(242, 239, 244, 1)', 'rgba(184, 169, 198, 1)'],
  },
];
