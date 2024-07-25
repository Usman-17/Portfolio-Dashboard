import AnimationWrapper from "@/components/common/AnimationWrapper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { ImageUp, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectLink: "",
    gitRepoLink: "",
    technologies: "",
    stack: "",
    deployed: "",
    projectImg: null,
  });

  const [projectImgPreview, setProjectImgPreview] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchSkill = async () => {
        const res = await fetch(`/api/v1/project/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          projectLink: data.projectLink || "",
          gitRepoLink: data.gitRepoLink || "",
          technologies: data.technologies || "",
          stack: data.stack || "",
          deployed: data.deployed || "",
        });

        if (data.projectImg) {
          setProjectImgPreview(data.projectImg.url);
        }
      };

      fetchSkill();
    }
  }, [id]);

  const {
    mutate: saveProject,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `/api/v1/project/update/${id}`
        : "/api/v1/project/create";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to save project");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success(
        `Project "${formData.title}" ${id ? "updated" : "created"} successfully`
      );
      navigate("/project/manage");
    },

    onError: () => {
      toast.error(`Failed to ${id ? "update" : "create"} Project`);
    },
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleProjectImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProjectImgPreview(reader.result);
        setFormData((prevState) => ({
          ...prevState,
          projectImg: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value || value === "") {
        formDataToSend.append(key, value);
      }
    });

    saveProject(formDataToSend);
  };

  return (
    <AnimationWrapper
      initial={{ y: 5 }}
      animate={{ y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <main className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/60 md:gap-8 py-0 sm:py-7 px-0 sm:px-20">
        <Card className="py-0 sm:py-3">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-10">
            <div>
              <CardTitle className="text-xl font-semibold">
                {id ? "Edit Project" : "Add New Project"}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Fill out the details below to add a project
              </p>
            </div>
            <Link to="/project/manage" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <Undo size={18} />
                Manage All Projects
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-5">
              {/* Title */}
              <div className="grid gap-2">
                <Label className="text-gray-700">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label className="text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="h-24 sm:h-32"
                  placeholder="Enter project description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                {/* Project Link */}
                <div className="grid gap-2">
                  <Label>Project Link</Label>
                  <Input
                    name="projectLink"
                    id="projectLink"
                    type="text"
                    placeholder="Enter project URL"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Github Link */}
                <div className="grid gap-2">
                  <Label>Github Link</Label>
                  <Input
                    type="text"
                    name="gitRepoLink"
                    id="gitRepoLink"
                    placeholder="Enter GitHub repository URL"
                    value={formData.gitRepoLink}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="grid gap-2">
                <Label className="text-gray-700">Technologies</Label>
                <Textarea
                  id="technologies"
                  name="technologies"
                  type="text"
                  required
                  placeholder="Enter technologies used"
                  value={formData.technologies}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                {/* Stack */}
                <div className="grid gap-2">
                  <Label className="text-gray-700">Stack</Label>
                  <Select
                    value={formData.stack}
                    onValueChange={(value) =>
                      handleSelectChange(value, "stack")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project Stack" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="mern">MERN STACK</SelectItem>
                        <SelectItem value="mean">MEAN STACK</SelectItem>
                        <SelectItem value="full-stack">FULL STACK</SelectItem>
                        <SelectItem value="nextjs">NEXT.JS</SelectItem>
                        <SelectItem value="reactjs">REACT.JS</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deployed */}
                <div className="grid gap-2">
                  <Label className="text-gray-700">Deployed</Label>
                  <Input
                    id="deployed"
                    name="deployed"
                    type="text"
                    required
                    placeholder="Enter deployment status"
                    value={formData.deployed}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full">
                <Label className="block text-sm font-medium text-gray-900">
                  Project Image
                </Label>

                <div className="mt-2 flex flex-col items-center border border-dashed border-gray-300 rounded-lg px-6 py-6">
                  {projectImgPreview ? (
                    <img
                      className="h-[250px] w-full object-contain"
                      src={projectImgPreview}
                      alt="Project Preview"
                    />
                  ) : (
                    <ImageUp
                      className="h-10 w-10 text-gray-300"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-3">
                    <label className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        required={id ? false : true}
                        onChange={handleProjectImgChange}
                      />
                    </label>
                    <p>or drag and drop</p>
                  </div>

                  <p className="text-xs text-gray-600 mt-2">
                    PNG, JPG, GIF up to 5MB
                  </p>
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
                      ? "Update Project"
                      : "Add Project"}
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

export default AddProjectPage;
