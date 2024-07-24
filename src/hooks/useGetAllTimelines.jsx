import { useQuery } from "@tanstack/react-query";

const useGetAllTimelines = () => {
  const {
    data: timelines,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["timelines"],
    queryFn: async () => {
      const response = await fetch("/api/v1/timeline/all");

      if (!response.ok) {
        throw new Error("Failed to fetch timelines");
      }

      return response.json();
    },
    retry: false,
  });

  return { timelines, isLoading, error, refetch, isRefetching };
};

export { useGetAllTimelines };
