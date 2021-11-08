export interface Line {
  date: Date;
  amount: number;
  balance: number;
}

export type PrintHandler = (lines: Line[]) => void;
