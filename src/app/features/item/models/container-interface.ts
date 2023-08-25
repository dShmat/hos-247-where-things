export interface ContainerInterface {
  id: string;
  name: string;
  description: string;
  volume: number;
  emptyVolume: number;
  nestedElements: string[];
  nestedTo: string;
}
