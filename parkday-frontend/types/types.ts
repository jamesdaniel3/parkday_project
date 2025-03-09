export interface RestaurantCardProps {
  name: string;
  description?: string;
  logoUrl?: string;
}

export interface MenuItemCardProps {
  id: number;
  name: string;
  isVegetarian: boolean;
  isKeto: boolean;
  isVegan: boolean;
  isDairyFree: boolean;
  isPaleo: boolean;
  description?: string;
  imageUrl?: string;
  priceUsd?: number;
  ingredients?: string;
}

export interface DietTagProps {
  text: string;
}
