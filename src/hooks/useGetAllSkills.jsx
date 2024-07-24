import { useQuery } from "@tanstack/react-query";

const useGetAllSkills = () => {
  const {
    data: skills,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await fetch("/api/v1/skill/all");

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      return response.json();
    },
    retry: false,
  });

  return { skills, isLoading, error, refetch, isRefetching };
};

export { useGetAllSkills };
