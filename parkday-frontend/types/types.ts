export interface RestaurantCardProps {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  storefrontUrl?: string;
}

export interface MenuCardProps {
  id: number;
  name: string;
  isVegetarian: boolean;
  isKeto: boolean;
  isVegan: boolean;
  isDairyFree: boolean;
  isPaleo: boolean;
  description?: string;
  image_url?: string;
}
