export interface Rolls {
  loading: boolean;
  rolls: Roll[];
}

export interface Roll {
  value: number;
  type: string;
  quess: "CORRECT" | "WRONG";
}
