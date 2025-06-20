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
    city: string;
  };
  picture: {
    large: string;
  };
  phone: string;
}