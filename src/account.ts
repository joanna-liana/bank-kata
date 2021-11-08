import { AccountService } from './accountService';
import { Clock } from './Clock';
import { Line, PrintHandler } from './PrintHandler';

interface LogData {
  date: Date;
  operation: string;
  amount: number;
}

export class Account implements AccountService {
  #initialBalance = 0;
  #operationsLog: LogData[] = [];

  constructor(
    private readonly clock: Clock,
    private readonly print: PrintHandler
  ) { }

  deposit(amount: number): void {
    this.#total += amount;

    this.#operationsLog.push({
      date: this.clock.currentDate,
      amount,
      operation: 'deposit'
    });
  }

  withdraw(amount: number): void {
    this.#total -= amount;

    this.#operationsLog.push({
      date: this.clock.currentDate,
      amount,
      operation: 'withdraw'
    });
  }

  printStatement(): void {
    const lines: Line[] = this.#operationsLog.reduce(
      (total, current, i) => {
        const parsedAmount = current.operation === 'withdraw' ?
          -current.amount :
          current.amount;
        const line: Line = {
          amount: parsedAmount,
          balance: (total[i - 1]?.balance ?? this.#initialBalance) + parsedAmount,
          date: current.date,
        };

        total.push(line);

        return total;
      },
      [] as Line[]
    );
    this.print(lines);
  }
}
