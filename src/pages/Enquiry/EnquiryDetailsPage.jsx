import AnimationWrapper from "@/components/common/AnimationWrapper";

import { Undo } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";

const EnquiryDetailsPage = () => {
  const { id } = useParams();

  const {
    data: enquiry,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["enquiry", id],
    queryFn: async () => {
      const res = await fetch(`/api/v1/enquiry/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      return res.json();
    },
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-4 sm:py-10 px-1 sm:px-20">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-10">
            <div>
              <CardTitle className="text-xl font-semibold">
                Enquiry Details
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View detailed information about the enquiry
              </p>
            </div>
            <Link to="/enquiries">
              <Button className="w-fit gap-2 text-xs sm:text-sm">
                <Undo size={18} />
                Back to Enquiries
              </Button>
            </Link>
          </CardHeader>

          {isLoading ? (
            <div className="p-4">
              <Skeleton className="h-4 sm:h-5 w-[300px] mb-5 sm:mb-4" />
              <Skeleton className="h-4 sm:h-4 w-72 sm:w-[350px] mb-4 sm:mb-3" />
              <Skeleton className="h-4 sm:h-4 w-[240px] mb-4 sm:mb-3" />
              <Skeleton className="h-4 sm:h-4 w-[280px] mb-6 sm:mb-5" />
              <Skeleton className="h-3 sm:h-4 w-full mb-4 sm:mb-3" />
              <Skeleton className="h-3 sm:h-4 w-full mb-3 sm:mb-2" />
              <Skeleton className="h-3 sm:h-4 w-full mb-3 sm:mb-2" />
              <Skeleton className="h-3 sm:h-4 w-full sm:w-[600px] mb-3 sm:mb-2" />
            </div>
          ) : (
            <CardContent>
              <div className="space-y-2">
                <div>
                  <strong>Name:</strong> {enquiry.name}
                </div>
                <div>
                  <strong>Email:</strong> {enquiry.email}
                </div>
                <div>
                  <strong>Mobile:</strong> {enquiry.mobile}
                </div>
                <div className="pb-2">
                  <strong>Subject:</strong> {enquiry.subject}
                </div>
                <div>
                  <strong>Comment:</strong> {enquiry.comment}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </main>
    </AnimationWrapper>
  );
};

export default EnquiryDetailsPage;
