import { AccountService } from './accountService';
import { Line, PrintHandler } from './PrintHandler';
import { TransactionsRepository } from './TransactionsRepository';

export interface LogData {
  date: Date;
  amount: number;
}

export class Account implements AccountService {
  #initialBalance = 0;

  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly print: PrintHandler
  ) { }

  deposit(amount: number): void {
    this.logTransaction(amount);
  }

  withdraw(amount: number): void {
    this.logTransaction(-amount);
  }

  async printStatement(): Promise<void> {
    const lines: Line[] = (await this.transactionsRepo.getAll())
      .reduce(
        (total, current, i) => {
          const parsedAmount = current.amount;

          const baseBalance = total[i - 1]?.balance ?? this.#initialBalance;

          total.push({
            amount: parsedAmount,
            balance: baseBalance + parsedAmount,
            date: current.date,
          });

          return total;
        },
        [] as Line[]
      );
    this.print(lines);
  }

  private logTransaction(amount: number) {
    this.transactionsRepo.logTransaction(amount);
  }
}
