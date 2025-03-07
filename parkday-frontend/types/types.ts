export interface RestaurantCardProps {
  id: number; // Required id for API calls
  name: string; // Required name
  description?: string; // Optional description
  logoUrl?: string; // Optional logo URL
  storefrontUrl?: string; // Optional storefront URL
}
