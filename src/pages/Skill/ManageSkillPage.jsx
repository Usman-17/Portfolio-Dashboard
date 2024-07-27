import { useState } from "react";
import AnimationWrapper from "@/components/common/AnimationWrapper";
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pencil, Redo, Trash2 } from "lucide-react";

import { useGetAllSkills } from "@/hooks/useGetAllSkills";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ManageSkillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const queryClient = useQueryClient();
  const { skills, isLoading: skillIsLoading } = useGetAllSkills();

  const { mutate: deleteSkill } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/v1/skill/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete skill");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Skill deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },

    onError: () => {
      toast.error("Failed to delete skill");
    },
  });

  const handleDeleteSkill = (id) => {
    setSelectedSkillId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSkillId) {
      deleteSkill(selectedSkillId);
      setIsModalOpen(false);
    }
  };

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex sm:min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-0 sm:py-7 px-0 sm:px-20">
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                All Skills
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View and manage your skills.
              </p>
            </div>

            <Link to="/skill/add" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Redo size={18} />
                Add New Skill
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SVG</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {skillIsLoading ? (
                <TableBody>
                  {[...Array(4)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-12 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-12" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <TableRow key={skill._id} className="hover:bg-gray-100">
                        <TableCell>{index + 1}</TableCell>

                        <TableCell className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {skill.name}
                        </TableCell>

                        <TableCell>
                          {skill?.svg ? (
                            <img
                              src={skill.svg.url}
                              alt={skill.name}
                              className="w-12 h-12 object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            "No image"
                          )}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {/* Edit */}
                          <Link to={`/skill/edit/${skill._id}`}>
                            <Button
                              variant="outline"
                              className="py-0 px-1.5 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-150 ease-in-out"
                              aria-label={`Edit ${skill.name}`}
                            >
                              <Pencil size={18} />
                            </Button>
                          </Link>

                          {/* Delete */}
                          <Button
                            variant="outline"
                            className="ml-3 py-0 px-1.5 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out"
                            onClick={() => handleDeleteSkill(skill._id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No skills available.
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
        message="Are you sure you want to delete this skill? You can’t undo this action."
      />
    </AnimationWrapper>
  );
};

export default ManageSkillPage;
