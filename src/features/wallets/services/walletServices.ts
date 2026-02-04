import axios from "axios";
import { Wallet } from "../types/wallet";

const BASE_URL = "https://698176b8c9a606f5d446ddaf.mockapi.io/wallets";

export const walletService = {
  async getWallets(): Promise<Wallet[]> {
    const res = await axios.get(BASE_URL);

    return res.data.map((w: any) => ({
      ...w,
      balance: Number(w.balance),
    }));
  },

  async createWallet(data: Omit<Wallet, "id">) {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  },

  async updateWallet(id: string, data: Partial<Wallet>) {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  },

  async deleteWallet(id: string) {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};
