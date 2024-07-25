import AnimationWrapper from "@/components/common/AnimationWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Undo } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
// Imports End

const AddTimelinePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (id) {
      const fetchTimeline = async () => {
        const res = await fetch(`/api/v1/timeline/${id}`);
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Failed to fetch timeline data");

        setFormData({
          title: data?.title || "",
          description: data?.description || "",
          from: data.timeline?.from || "",
          to: data.timeline?.to || "",
        });
      };

      fetchTimeline();
    }
  }, [id]);

  const {
    mutate: saveTimeline,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async ({ title, description, from, to }) => {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `/api/v1/timeline/update/${id}`
        : "/api/v1/timeline/create";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, from, to: to || null }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save timeline");
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timelines"] });
      setFormData("");

      toast.success(
        `Timeline "${formData.title}" ${
          id ? "updated" : "created"
        } successfully`
      );

      navigate("/timeline/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} timeline`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTimeline(formData);
  };

  return (
    <AnimationWrapper
      initial={{ y: 3 }}
      animate={{ y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex sm:min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-0 sm:py-7 px-0 sm:px-20">
        <Card className="py-3">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-10">
            <div>
              <CardTitle className="text-xl font-semibold">
                {id ? "Edit Timeline" : "Add New Timeline"}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Fill out the details below to add a timeline
              </p>
            </div>

            <Link to="/timeline/manage" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Undo size={18} />
                Manage Timeline
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-gray-700">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <div className="grid gap-2">
                  <Label className="text-gray-700">Start Date</Label>
                  <Input
                    type="text"
                    name="from"
                    required
                    value={formData.from}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-gray-700">End Date</Label>
                  <Input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {isError && <div className="text-red-500">{error.message}</div>}

              <div className="mt-2 sm:mt-3">
                {isPending ? (
                  <LoadingSpinner content={"Saving..."} className="w-full" />
                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending
                      ? "Saving..."
                      : id
                      ? "Update Timeline"
                      : "Add Timeline"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </AnimationWrapper>
  );
};

export default AddTimelinePage;
