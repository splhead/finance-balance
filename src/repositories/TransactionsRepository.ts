import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, element) => {
      return element.type === 'income' ? (total += element.value) : total;
    }, 0);

    const outcome = this.transactions.reduce((total, element) => {
      return element.type === 'outcome' ? (total += element.value) : total;
    }, 0);

    const total = income - outcome;

    /* if (total < 0) {
      throw new Error('Outcome higher than you have.');
    } */

    return {
      income,
      outcome,
      total,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
