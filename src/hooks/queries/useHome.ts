import { useQuery } from "@tanstack/react-query";

import { getHome } from "@/api/home";
import { useUserStore } from "@/stores/useUserStore";

export const useHome = () => {
  const userId = useUserStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["home", userId],
    queryFn: () => getHome(userId!),
    enabled: !!userId,
  });
};
