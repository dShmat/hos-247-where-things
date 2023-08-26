export interface ContainerInterface {
  id: number;
  name: string;
  description: string;
  volume: number;
  emptyVolume: number;
  nestedItems: number[];
  nestedContainers: number[];
  nestedTo: number | null;
}
