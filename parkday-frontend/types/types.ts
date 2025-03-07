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
  is_vegetarian: boolean;
  is_keto: boolean;
  is_vegan: boolean;
  is_dairy_free: boolean;
  is_paleo: boolean;
  description?: string;
  image_url?: string;
}
