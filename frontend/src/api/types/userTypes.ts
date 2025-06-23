export interface User {
  id?: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  location: {
    country: string;
    state: string;
    city: string;
  };
  dob: {
    age: number;
    date?: Date;
  };
  picture: {
    large: string;
  };
  phone: string;
}
