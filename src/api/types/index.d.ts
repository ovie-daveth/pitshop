export interface ISignUpInput {
  otp: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  role: "regular" | "admin" | "superadmin";
  status: "active" | "inactive";
  firstName: string;
  lastName: string;
  email: string;
  isUpdated: boolean;
  isAccountVerified: boolean;
  createdAt: string;
}

export interface ICompany {
  id: string;
  created_by: IUser;
  name: string;
  description: string;
  industryId: number;
  price: number;
  location: string;
  propertyType: string;
  status: string;
  images: IImage[];
  guestCapacity: number;
  bedrooms: number;
  privateBed: number;
  privateBathroom: boolean;
  dedicatedBathroom: boolean;
  sharedBathroom: boolean;
  minimumNights: number;
  maximumNights: number;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  // bookings: IBooking[];
}

export interface ICreateCompanyInput {
  name: string;
  description: string;
  industryId: number;
}

export interface ICreateRolesInput {
  name: string;
  description?: string | number;
  permissions: string[];
}

export interface IRoles {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUsers {
  email: string;
  firstName: string;
  lastName: string;
  roles: IRoles[];
}

export interface ICreateUsersInput {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

