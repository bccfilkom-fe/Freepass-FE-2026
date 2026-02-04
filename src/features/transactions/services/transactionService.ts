import axios from "axios";
import { Transaction } from "../types/transaction.types";
import { walletService } from "../../wallets/services/walletServices";

const BASE_URL = "https://698176b8c9a606f5d446ddaf.mockapi.io/transactions";

export const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const res = await axios.get(BASE_URL);
    return res.data;
  },

  async createTransaction(data: Omit<Transaction, "id">) {
    const wallet = await axios.get(
      `https://698176b8c9a606f5d446ddaf.mockapi.io/wallets/${data.walletId}`,
    );

    const currentBalance = wallet.data.balance;

    const newBalance =
      data.type === "income"
        ? currentBalance + data.amount
        : currentBalance - data.amount;

    await walletService.updateWallet(data.walletId, {
      balance: newBalance,
    });

    const res = await axios.post(BASE_URL, data);

    return res.data;
  },

  async updateTransaction(id: string, data: Partial<Transaction>) {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  async deleteTransaction(tx: Transaction) {
    const wallet = await axios.get(
      `https://698176b8c9a606f5d446ddaf.mockapi.io/wallets/${tx.walletId}`,
    );

    const currentBalance = wallet.data.balance;

    const restoredBalance =
      tx.type === "income"
        ? currentBalance - tx.amount
        : currentBalance + tx.amount;

    await walletService.updateWallet(tx.walletId, {
      balance: restoredBalance,
    });

    await axios.delete(`${BASE_URL}/${tx.id}`);
  },
};
