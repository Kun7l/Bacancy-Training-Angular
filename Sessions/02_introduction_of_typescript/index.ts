interface IPersonInfo {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    city: string;
    pincode: number;
    street: string;
    getFullName(): string;
}

class PersonInfo implements IPersonInfo {
   constructor(public firstName: string, public lastName: string, public age: number, public address: string, public city: string, public pincode: number, public street: string) {
   }
   getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
    }

    getFullAddress(): string {
        return `${this.address}, ${this.city}, ${this.pincode}`;
    }
}

let personInfo = new PersonInfo("Krunal", "Khairanar", 21, "A2 shree nagar soc", "Surat", 395004, "Dabholi road");
console.log(personInfo.getFullName());
console.log(personInfo.getFullAddress());


