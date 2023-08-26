export interface ContainerInterface {
  id: number;
  name: string;
  description: string;
  volume: number;
  emptyVolume: number;
  nestedElements: number[];
  nestedTo: number | null;
}
