export interface FormData {
  step: number;
  numPeople: number;
  numBedrooms: number;
  hasYard: "none" | "small" | "large";
  hasLaundry: "none" | "compact" | "spacious";
  location: "urban" | "rural";
  bedConfig: "separate" | "shared";
  checkIn?: Date;
  checkInTime?: string;
  checkOut?: Date;
  checkOutTime?: string;
  contactPreference: "email" | "whatsapp";
  fullName?: string;
  email?: string;
  phone?: string;
  additionalInfo?: string;
}

export interface QuotationData {
  additional_info?: string;
  bed_config: string;
  check_in_date?: string;
  check_in_time?: string;
  check_out_date?: string;
  check_out_time?: string;
  contact_preference: string;
  email: string;
  full_name: string;
  has_laundry: string;
  has_yard: string;
  location: string;
  num_bedrooms: number;
  num_people: number;
  phone: string;
  quoted_price: number;
}

export interface ValidationError {
  field: string;
  message: string;
}