export interface EmpresaGoogle {
  nombreGoogle: string | null;
  direccionGoogle: string | null;
  valoracion: number | null;
  numeroValoraciones: number | null;
  googleMapsUrl: string | null;
  atribuciones: {
    provider: string;
    providerUri: string | null;
  }[];
}
