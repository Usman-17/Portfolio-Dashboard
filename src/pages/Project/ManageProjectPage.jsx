import { useState } from "react";
import AnimationWrapper from "@/components/common/AnimationWrapper";
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pencil, Redo, ScanSearch, Trash2 } from "lucide-react";

import { useGetAllProjects } from "@/hooks/useGetAllProjects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Imports End

const ManageProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const queryClient = useQueryClient();

  const { projects, isLoading: projectIsLoading } = useGetAllProjects();

  const { mutate: deleteEnquiry } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/v1/project/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },

    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const handleDeleteProject = (id) => {
    setSelectedProjectId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProjectId) {
      deleteEnquiry(selectedProjectId);
    }
  };

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex sm:min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 sm:py-7 sm:px-20">
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                View All Projects
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View and Manage All Projects
              </p>
            </div>

            <Link to="/project/add" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Redo size={18} />
                Add New Project
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-100">
                  <TableHead>Sr.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Stack</TableHead>
                  <TableHead>Deployed</TableHead>
                  <TableHead>Posted At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {projectIsLoading ? (
                <TableBody>
                  {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <TableRow key={project._id} className="hover:bg-gray-100">
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>
                          {project?.projectImg ? (
                            <img
                              src={project.projectImg.url}
                              alt={project.title}
                              className="w-12 h-12 object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            "No image"
                          )}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {project.title}
                        </TableCell>

                        <TableCell className="uppercase">
                          {project.stack}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {project.deployed}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {moment(project.createdAt).format("DD, MMMM YYYY")}
                        </TableCell>

                        <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {/* View */}
                          <Link to={`/project/${project._id}`}>
                            <Button
                              variant="ghost"
                              className="py-2 px-2 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-75 ease-in-out"
                            >
                              <ScanSearch size={22} className="text-current" />
                            </Button>
                          </Link>

                          {/* Edit */}
                          <Link
                            to={`/project/edit/${project._id}`}
                            aria-label="Edit Project"
                          >
                            <Button
                              variant="outline"
                              className="ml-2 py-1 px-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-75 ease-in-out"
                            >
                              <Pencil size={18} />
                            </Button>
                          </Link>

                          {/* Delete */}
                          <Button
                            variant="outline"
                            className="ml-2 py-1 px-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-75 ease-in-out"
                            onClick={() => handleDeleteProject(project._id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No projects available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </main>

      <ConfirmDeleteDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this project? You can’t undo this action."
      />
    </AnimationWrapper>
  );
};

export default ManageProjectPage;
