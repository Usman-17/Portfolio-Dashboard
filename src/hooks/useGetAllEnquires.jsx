import { useQuery } from "@tanstack/react-query";

const useGetAllEnquires = () => {
  const {
    data: enquiries,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const response = await fetch("/api/v1/enquiry/all");

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      return response.json();
    },
    retry: false,
  });

  return { enquiries, isLoading, error, refetch, isRefetching };
};

export { useGetAllEnquires };
