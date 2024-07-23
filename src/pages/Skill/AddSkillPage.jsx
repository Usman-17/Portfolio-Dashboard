import { useState } from "react";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import AnimationWrapper from "@/components/common/AnimationWrapper";

import { Undo } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useMutation } from "@tanstack/react-query";
// Imports End

const AddSkillPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    svg: null,
  });
  const [svgPreview, setSvgPreview] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    mutate: saveSkill,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/v1/skill/update/${id}` : "/api/v1/skill/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save skill");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Skill "${formData.name}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/dashboard");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} skill`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSvgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSvgPreview(reader.result);
        setFormData((prevState) => ({
          ...prevState,
          svg: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.svg) formDataToSend.append("svg", formData.svg);

    saveSkill(formDataToSend);
  };

  return (
    <AnimationWrapper
      initial={{ y: 5 }}
      animate={{ y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-4 sm:py-10 px-1 sm:px-20">
        <Card className="py-3">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-10">
            <div>
              <CardTitle className="text-xl font-semibold">
                {id ? "Edit Skill" : "Add New Skill"}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Fill out the details below to add a skill
              </p>
            </div>
            <Link to="/dashboard" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Undo size={18} />
                Back to Dashboard
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              {/* Skill Name */}
              <div className="grid gap-2">
                <Label className="text-gray-700">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Skill Svg */}
              {/* 
              <div className="grid gap-2">
                <Label htmlFor="svg" className="text-gray-700">
                  SVG
                </Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSvgChange}
                />
                {svgPreview && (
                  <img
                    src={svgPreview}
                    alt="SVG Preview"
                    className="mt-2 w-32 h-32 object-contain"
                  />
                )}
              </div> */}

              <div className="w-full col-span-full">
                <Label className="block text-sm font-medium text-gray-900">
                  Skill SVG
                </Label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                  <div className="text-center">
                    {svgPreview ? (
                      <img
                        className="mx-auto h-20 w-20 text-gray-300 object-contain"
                        src={svgPreview}
                        alt="SVG Preview"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          required="true"
                          onChange={handleSvgChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {isError && <div className="text-red-500">{error.message}</div>}

              <div className="mt-2 sm:mt-3">
                {isPending ? (
                  <LoadingSpinner content="Saving..." className="w-full" />
                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending
                      ? "Saving..."
                      : id
                      ? "Update Skill"
                      : "Add Skill"}
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

export default AddSkillPage;
