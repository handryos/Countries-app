export default interface Countrie {
  borders: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  };
  population: [
    {
      value: number;
      year: number;
    }
  ];
  flag: string;
}
