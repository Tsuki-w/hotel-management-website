export type TGuest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type TCreateGuest = {
  email: string;
  fullName: string;
};

export type TUpdateGuest = {
  nationalID: string;
  nationality: string;
  countryFlag: string;
};
