export interface ThingInterface {
  id?: string;
  name: string;
  description: string;
  volume: number;
  nestedTo?: string | null;
}
