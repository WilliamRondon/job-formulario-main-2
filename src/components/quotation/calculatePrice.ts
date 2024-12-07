import { FormData } from "./types";

export const calculatePrice = (data: FormData): number => {
  let basePrice = 250000; // Base price in BRL
  
  // Number of people adjustment
  if (data.numPeople >= 5) {
    basePrice *= 1.35; // 35% increase
  } else if (data.numPeople >= 3) {
    basePrice *= 1.2; // 20% increase
  }

  // Bedrooms adjustment
  if (data.numBedrooms >= 4) {
    basePrice *= 1.65; // 65% increase
  } else if (data.numBedrooms === 3) {
    basePrice *= 1.45; // 45% increase
  } else if (data.numBedrooms === 2) {
    basePrice *= 1.25; // 25% increase
  }

  // Yard adjustment
  if (data.hasYard === "large") {
    basePrice *= 1.25; // 25% increase
  } else if (data.hasYard === "small") {
    basePrice *= 1.125; // 12.5% increase
  }

  // Laundry adjustment
  if (data.hasLaundry === "spacious") {
    basePrice *= 1.175; // 17.5% increase
  } else if (data.hasLaundry === "compact") {
    basePrice *= 1.075; // 7.5% increase
  }

  // Location adjustment
  if (data.location === "rural") {
    basePrice *= 0.85; // 15% decrease
  }

  // Bed configuration adjustment
  if (data.bedConfig === "separate") {
    basePrice *= 1.065; // 6.5% increase
  }

  return Math.round(basePrice);
};