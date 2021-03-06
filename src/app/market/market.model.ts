export interface Order {
  id: number;
  person: number;
  clicks: number;
  offer: number;
  unit: string;
  held?: boolean;
}

export interface Relationship {
  id: number;
  value: number;
}
