export interface datatype {
    _id: string; 
    name: string;
    email: string;
    phone: number;
  }

  export interface formdatatype {
    name: string;
    email: string;
    phone: number | null;
    id?: string;
  }
