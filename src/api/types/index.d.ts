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
  roles: any;
  user: any;
  company: Company;
  reference: string;
  id: number;
  created_by: IUser;
  name: string;
  description: string;
  industryId: number;
  price: number;
  location: string;
  propertyType: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  // bookings: IBooking[];
}


export interface Company {
  createdAt: string;
  updatedAt: string;
  id: number;
  reference: string;
  name: string;
  logo: string | null;
  description: string;
  companyIndustry: ICompanyIndustry;
}


export interface ICompanyIndustry {
  name: ReactNode;
  id: Key | null | undefined;
  company: ICompany[];
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
  external: boolean;
  type: string;
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IPermissions {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissionCategory: [];
}

export interface IUsers {
  user: any;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: IRoles[];
}

export interface IInvites {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // roles: IRoles[];
}

export interface ICreateUsersInput {
  email: string;
  roles: string[];
}

export interface IAcceptUsersInviteInput {
  status: string;
  reference: string;
}

export interface IOnboardInvitedUsers {
  email: string;
  reference: string;
  password: string;
}

export interface IUserCompanyRoles {
  user: [];
  company: [];
  roles: [];
}

export interface IAdPlatform {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAllAdPlatform {
  ads: [];
}

export interface IAdPlatformAccount {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAllAdPlatformAccount {
  accounts: [];
}

export interface IToggleAdPlatformAccount {
  reference: string;
  active: boolean;
}

export interface IAdPlatformAccountUsers {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAllAdPlatformAccountUsers {
  users: [];
}

export interface IAddAdPlatformAccountUsers {
  reference: string;
  permissionId: string;
  userId: string;
}

export interface IDeleteAdPlatformAccountUsers {
  reference: string;
}

export interface IIntegrateAdPlatformAccount {
  platformId: number;
  token: string;
}

export interface IIntegrateAdPlatformAccountResponse {
  integrations: [];
}

export interface INotifications {
  id: number;
  title: string;
  message: string;
  type: string;
  createdAt: string;
}

export interface ISendNotifications {
  to: string;
  type: string;
}
