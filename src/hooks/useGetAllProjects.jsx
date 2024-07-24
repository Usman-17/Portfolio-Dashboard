import { useQuery } from "@tanstack/react-query";

const useGetAllProjects = () => {
  const {
    data: projects,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/v1/project/all");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
    retry: false,
  });

  return { projects, isLoading, error, refetch, isRefetching };
};

export { useGetAllProjects };
