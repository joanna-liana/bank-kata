import {
  Account
} from './account';
import { Clock } from './Clock';
import {
  InMemoryTransactionsRepository
} from './InMemoryTransactionsRepository';
import { PrintHandler } from './PrintHandler';
import {
  TransactionsRepository
} from './TransactionsRepository';

describe(
  'Print Statement',
  () => {
    let clock: Clock;
    let print: PrintHandler;
    let transactionsRepo: TransactionsRepository;
    let account: Account;

    beforeEach(() => {
      clock = { currentDate: new Date() };

      print = jest.fn();
      transactionsRepo = new InMemoryTransactionsRepository(clock);

      account = new Account(
        transactionsRepo,
        print,
      );
    });

    it(
      'Acceptance test',
      async () => {
        // given
        clock.currentDate = new Date('2012-01-10');
        account.deposit(1000);

        clock.currentDate = new Date('2012-01-13');
        account.deposit(2000);

        clock.currentDate = new Date('2012-01-14');
        account.withdraw(500);

        // when
        await account.printStatement();

        // then
        expect(print).toHaveBeenCalledWith([
          {
            date: new Date('2012-01-10'),
            amount: 1000,
            balance: 1000
          },
          {
            date: new Date('2012-01-13'),
            amount: 2000,
            balance: 3000
          },
          {
            date: new Date('2012-01-14'),
            amount: -500,
            balance: 2500
          }
        ]);
      }
    );

    it(
      'allows to deposit money',
      async () => {
        // when
        clock.currentDate = new Date('2012-01-10');
        account.deposit(100);

        // then
        const transactions = await transactionsRepo.getAll();

        expect(transactions).toStrictEqual([{
          date: new Date('2012-01-10'),
          amount: 100
        }]);
      }
    );

    it(
      'allows to withdraw money',
      async () => {
        // when
        clock.currentDate = new Date('2012-01-12');
        account.withdraw(100);

        // then
        const transactions = await transactionsRepo.getAll();

        expect(transactions).toStrictEqual([{
          date: new Date('2012-01-12'),
          amount: -100
        }]);
      }
    );
  }
);
