export interface POINTS {
  point: string;
  createdAt: string;
}

export interface ADDRESS {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
  cep: string;
  name: string;
  complement: string;
  phone: string;
  document: string;
}
export interface DIMENSION {
  width: number;
  height: number;
  length: number;
  weight: number;
}
export interface ORDER {
  deliveryOrder: string;
  value: number;
  order: any;
  client: string;
  shopId: number;
  addressOrigin: ADDRESS;
  addressDestiny: ADDRESS;
  deliveryDate: string;
  lastPoint: string;
  points: Array<POINTS>;
  active: boolean;
  createdAt: string;
  dimension: DIMENSION;
}