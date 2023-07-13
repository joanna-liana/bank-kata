import assert from 'assert';
import { beforeEach, describe, it } from 'node:test';

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

describe('Account', () => {
  let clock: Clock;
  let print: PrintHandler;
  let transactionsRepo: TransactionsRepository;
  let account: Account;

  beforeEach(() => {
    clock = { currentDate: new Date() };

    print = () => { /* noop */ };
    transactionsRepo = new InMemoryTransactionsRepository(clock);

    account = new Account(
      transactionsRepo,
      print,
    );
  });

  it('allows to deposit money', async () => {
    // when
    clock.currentDate = new Date('2012-01-10');
    account.deposit(100);

    // then
    const transactions = await transactionsRepo.getAll();

    assert.deepStrictEqual(transactions, [{
      date: new Date('2012-01-10'),
      amount: 100
    }]);
  });

  it('allows to withdraw money', async () => {
    // when
    clock.currentDate = new Date('2012-01-12');
    account.withdraw(100);

    // then
    const transactions = await transactionsRepo.getAll();

    assert.deepStrictEqual(transactions, [{
      date: new Date('2012-01-12'),
      amount: -100
    }]);
  });
});
