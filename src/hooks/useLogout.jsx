import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/logout", {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to logout account");
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      toast.success("Logout successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },

    onError: () => {
      toast.error("Logout Failed");
    },
  });

  return { logoutMutation };
};

export default useLogout;
