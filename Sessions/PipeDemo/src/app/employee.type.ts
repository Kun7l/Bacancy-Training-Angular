export interface Employee {
  name: string;
  dateOfJoining: Date;
  salary: number;
  email: string;
  department: string;
  description: string;
  adharNumber: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
