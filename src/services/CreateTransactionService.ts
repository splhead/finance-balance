import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw new Error('Outcome higher than you have.');
    }

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
