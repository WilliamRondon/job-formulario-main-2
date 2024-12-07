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