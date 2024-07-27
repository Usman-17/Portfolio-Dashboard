import AnimationWrapper from "@/components/common/AnimationWrapper";
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pencil, Redo, Trash2 } from "lucide-react";

import { useGetAllTimelines } from "@/hooks/useGetAllTimelines";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
// Imports End

const ManageTimelinePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimelineId, setSelectedTimelineId] = useState(null);

  const queryClient = useQueryClient();

  const { timelines, isLoading: timelineIsLoading } = useGetAllTimelines();

  const { mutate: deleteTimeline } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/v1/timeline/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete timeline");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Timeline deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
    },

    onError: () => {
      toast.error("Failed to delete timeline");
    },
  });

  const handleDeleteTimeline = (id) => {
    setSelectedTimelineId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTimelineId) {
      deleteTimeline(selectedTimelineId);
      setIsModalOpen(false);
    }
  };

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex sm:min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-0 sm:py-7 px-0 sm:px-20">
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Timeline</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View and manage your timeline.
              </p>
            </div>

            <Link to="/timeline/add" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Redo size={18} />
                Add New Timeline
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {timelineIsLoading ? (
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
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {timelines.length > 0 ? (
                    timelines.map((timeline, index) => (
                      <TableRow
                        key={timeline._id}
                        className="hover:bg-gray-100"
                      >
                        <TableCell>{index + 1}</TableCell>

                        <TableCell className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {timeline.title}
                        </TableCell>

                        <TableCell className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {timeline.description}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {timeline?.timeline.from}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {timeline?.timeline?.to
                            ? timeline.timeline.to
                            : "Present"}
                        </TableCell>

                        <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {/* Edit */}

                          <Link to={`/timeline/edit/${timeline._id}`}>
                            <Button
                              variant="outline"
                              className="py-0 px-1.5 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-150 ease-in-out"
                            >
                              <Pencil size={18} />
                            </Button>
                          </Link>

                          {/* Delete */}
                          <Button
                            variant="outline"
                            className="ml-3 py-0 px-1.5 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out"
                            onClick={() => handleDeleteTimeline(timeline._id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No timeline available.
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
        message="Are you sure you want to delete this timeline? You can’t undo this action."
      />
    </AnimationWrapper>
  );
};

export default ManageTimelinePage;
