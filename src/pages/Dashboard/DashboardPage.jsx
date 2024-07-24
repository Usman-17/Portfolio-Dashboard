import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllProjects } from "@/hooks/useGetAllProjects";
import { useGetAllSkills } from "@/hooks/useGetAllSkills";
import { useGetAllTimelines } from "@/hooks/useGetAllTimelines";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Undo } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";
import AnimationWrapper from "@/components/common/AnimationWrapper";
import { Skeleton } from "@/components/ui/skeleton";
// Imports End

const DashboardPage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { projects, isLoading: projectIsLoading } = useGetAllProjects();
  const { skills } = useGetAllSkills();
  const { timelines } = useGetAllTimelines();

  return (
    <AnimationWrapper transition={{ duration: 0.2 }}>
      <main className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/60 pt-4 sm:py-7 px-0 sm:px-20">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="text-balance leading-relaxed">
                  {authUser?.aboutMe?.length > 220
                    ? `${authUser.aboutMe.substring(0, 220)}...`
                    : authUser?.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/" className="w-fit">
                  <Button className="gap-1 text-xs sm:text-sm">
                    <Undo size={18} />
                    Visit Portfolio
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Projects Completed</CardTitle>
                <CardTitle className="text-6xl">
                  {projects?.length || 0}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/"}>
                  <Button className="text-xs sm:text-sm">
                    Manage Projects
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-6xl">
                  {skills?.length || 0}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={"/skill/manage"}>
                  <Button className="text-xs sm:text-sm">Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Latest Projects */}
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">
                Latest Projects
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Check out and update the most recent five projects.
              </p>
            </div>

            <Link to="/dashboard" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <TrendingUp size={18} />
                Manage Projects
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            {projectIsLoading ? (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex flex-col gap-5">
                        <Skeleton height="40px" className="mb-3" />
                        <Skeleton height="40px" className="mb-3" />
                        <Skeleton height="40px" className="mb-3" />
                        <Skeleton height="40px" className="mb-3" />
                        <Skeleton height="40px" className="mb-3" />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr.</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead>Posted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.slice(0, 5).map((project, index) => (
                      <TableRow key={project._id} className="hover:bg-gray-100">
                        <TableCell>{index + 1}</TableCell>
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
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No projects available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Skills</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                Discover and update your skills.
              </p>
            </div>

            <Link to="/" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <TrendingUp size={18} />
                Manage Skills
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {skills && skills.length > 0 ? (
                skills.slice(0, 6).map((skill) => (
                  <div
                    key={skill._id}
                    className="flex flex-col items-center justify-center px-2 py-2 sm:p-4 border rounded-md shadow-sm"
                  >
                    <img
                      src={skill?.svg && skill.svg.url}
                      alt={skill.name}
                      className="w-16 h-16 object-contain mb-2 rounded-full"
                    />
                    <h3 className="text-sm sm:text-lg font-semibold">
                      {skill.name}
                    </h3>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  No skills available.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        
        {/* Timeline */}
        <Card>
          <CardHeader className="flex gap-2 sm:justify-between sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-semibold">Timeline</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600">
                View and manage all project timelines.
              </p>
            </div>

            <Link to="/dashboard" className="w-fit">
              <Button className="gap-2 text-xs sm:text-sm">
                <TrendingUp size={18} />
                Manage Timeline
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {timelines && timelines.length > 0 ? (
                  timelines.slice(0, 5).map((timeline, index) => (
                    <TableRow key={timeline._id} className="hover:bg-gray-100">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {timeline.title}
                      </TableCell>
                      <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {timeline?.description}
                      </TableCell>
                      <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {timeline?.timeline.from}
                      </TableCell>
                      <TableCell className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {timeline?.timeline?.to
                          ? timeline.timeline.to
                          : "Present"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No timeline available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </AnimationWrapper>
  );
};

export default DashboardPage;
