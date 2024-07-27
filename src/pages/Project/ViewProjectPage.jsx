import { Undo } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AnimationWrapper from "@/components/common/AnimationWrapper";

const ViewProjectPage = () => {
  const { id } = useParams();

  const {
    data: project,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/v1/project/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        throw new Error(`Failed to fetch project: ${error.message}`);
      }
    },

    retry: false,
  });

  if (isError) {
    return (
      <div className="text-red-600 p-4">
        <p>Error: {error.message}</p>
        toast.error({error.message})
      </div>
    );
  }

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex flex-col bg-muted/20 py-4 px-2 sm:px-20 lg:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-8">
          <div>
            <div className="text-xl font-semibold">Project Details</div>
            <p className="text-xs sm:text-sm text-gray-600">
              Review the details of the selected project below.
            </p>
          </div>
          <Link to="/project/manage" className="w-fit">
            <Button className="gap-2 text-xs sm:text-sm">
              <Undo size={18} />
              Manage All Projects
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-4xl font-bold text-gray-800 mb-3">
              {project?.title}
            </h1>

            <img
              src={project?.projectImg?.url}
              alt={project?.title}
              className="w-full h-auto rounded-lg mb-2 sm:mb-4 object-contain"
              loading="lazy"
              decoding="async"
            />

            <div className="mb-2 sm:mb-3">
              <h2 className="text-lg font-semibold">Description:</h2>
              <p className="mt-1 text-gray-700">{project?.description}</p>
            </div>

            <div className="mb-4 sm:mb-5">
              <h2 className="text-xl font-bold text-gray-800">Technologies:</h2>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                {project?.technologies?.split(",").map((technology, i) => (
                  <li key={i} className="mb-1 capitalize">
                    {technology.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-2 sm:mb-3">
              <h2 className="text-lg font-semibold">Stack:</h2>
              <p className="mt-1 text-gray-700 uppercase">{project?.stack}</p>
            </div>

            <div className="mb-2 sm:mb-3">
              <h2 className="text-lg font-semibold">Deployed:</h2>
              <p className="mt-1 text-gray-700">{project?.deployed}</p>
            </div>

            {project?.gitRepoLink && (
              <div className="mb-2 flex gap-3 items-center">
                <h3 className="text-lg font-semibold">GitHub Repository:</h3>
                <h3 className="mt-1 text-gray-700">
                  <a
                    href={project?.gitRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {project?.gitRepoLink}
                  </a>
                </h3>
              </div>
            )}

            {project?.projectLink && (
              <div className="mb-2 sm:mb-3 flex gap-3 items-center">
                <h3 className="text-lg font-semibold">Project Link:</h3>
                <h3 className="mt-1 text-gray-700">
                  <a
                    href={project?.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {project?.projectLink}
                  </a>
                </h3>
              </div>
            )}
          </>
        )}
      </main>
    </AnimationWrapper>
  );
};

export default ViewProjectPage;
