import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService } from "../services/walletServices";

export const useWallets = () => {
  const queryClient = useQueryClient();

  const walletsQuery = useQuery({
    queryKey: ["wallets"],
    queryFn: walletService.getWallets,
  });

  const createMutation = useMutation({
    mutationFn: walletService.createWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      walletService.updateWallet(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: walletService.deleteWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  return {
    walletsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
