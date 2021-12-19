import { LogData } from './account';


export interface TransactionsRepository {
  getAll(): Promise<LogData[]>;
  logTransaction(amount: number): Promise<void>;
}
