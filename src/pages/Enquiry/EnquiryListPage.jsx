import { useState } from "react";

import AnimationWrapper from "@/components/common/AnimationWrapper";

import moment from "moment";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Inbox, ScanSearch, Trash2, Undo } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetAllEnquires } from "@/hooks/useGetAllEnquires";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog";
import { Skeleton } from "@/components/ui/skeleton";
// Imports End

const EnquiryListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);

  const queryClient = useQueryClient();

  const { enquiries, isLoading } = useGetAllEnquires();

  const { mutate: deleteEnquiry } = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/v1/enquiry/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete enquiry");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Enquiry deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },

    onError: () => {
      toast.error("Failed to delete enquiry");
    },
  });

  const handleDeleteEnquiry = (id) => {
    setSelectedEnquiryId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEnquiryId) {
      deleteEnquiry(selectedEnquiryId);
    }
  };

  return (
    <AnimationWrapper
      initial={{ y: 3 }}
      animate={{ y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex sm:min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 sm:py-7 sm:px-20">
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Enquiries</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View and manage all customer enquiries
              </p>
            </div>

            <Link to="/">
              <Button className="w-fit gap-2 text-xs sm:text-sm">
                <Undo size={18} />
                Return To Dashboard
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Posted At</TableHead>
                  <TableHead className="text-left">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-full" />
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
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : enquiries.length > 0 ? (
                <TableBody>
                  {enquiries.map((enquiry, i) => (
                    <TableRow key={enquiry._id} className="hover:bg-gray-100">
                      <TableCell>{i + 1}</TableCell>

                      <TableCell className="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {enquiry.name}
                      </TableCell>

                      <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {enquiry.email}
                      </TableCell>

                      <TableCell>{enquiry.mobile}</TableCell>

                      <TableCell className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {enquiry.subject}
                      </TableCell>

                      <TableCell className="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {enquiry.comment}
                      </TableCell>

                      <TableCell className="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {moment(enquiry.createdAt).format("DD, MMMM YYYY")}
                      </TableCell>

                      <TableCell>
                        <Link to={`/enquiries/${enquiry._id}`}>
                          <ScanSearch className="h-7 w-7 text-blue-500 hover:text-blue-600" />
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          className="py-0 px-1.5 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out"
                          onClick={() => handleDeleteEnquiry(enquiry._id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <CardContent className="text-center h-64 flex items-center justify-center gap-4">
                  <Inbox className="h-10 w-10 text-gray-500" />
                  <p className="text-gray-500">No enquiries available</p>
                </CardContent>
              )}
            </Table>
          </CardContent>
        </Card>
      </main>

      <ConfirmDeleteDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
      />
    </AnimationWrapper>
  );
};

export default EnquiryListPage;
