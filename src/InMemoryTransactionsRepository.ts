import { LogData } from './account';
import { Clock } from './Clock';
import { TransactionsRepository } from './TransactionsRepository';


export class InMemoryTransactionsRepository implements TransactionsRepository {
  #operationsLog: LogData[] = [];

  constructor(
    private readonly clock: Clock
  ) { }

  public async logTransaction(amount: number): Promise<void> {
    this.#operationsLog.push({
      date: this.clock.currentDate,
      amount,
    });
  }

  public async getAll(): Promise<LogData[]> {
    return this.#operationsLog.slice();
  }
}
