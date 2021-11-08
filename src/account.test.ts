import { Account } from './account';
import { Clock } from './Clock';

describe(
  'Account',
  () => {
    it(
      'Acceptance test',
      async () => {
        // given
        const clock: Clock = { currentDate: new Date() };
        const print = jest.fn();

        const account = new Account(
          clock,
          print
        );

        clock.currentDate = new Date('2012-01-10');
        account.deposit(1000);

        clock.currentDate = new Date('2012-01-13');
        account.deposit(2000);

        clock.currentDate = new Date('2012-01-14');
        account.withdraw(500);

        // when
        account.printStatement();

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
        //         expect(print).toHaveBeenCalledWith(`
        //   Date       || Amount || Balance
        //   14/01/2012 || -500   || 2500
        //   13/01/2012 || 2000   || 3000
        //   10/01/2012 || 1000   || 1000
        // `);
      }
    );
  }
);
