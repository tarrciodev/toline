import { getProjectsOfInterest } from "@/actions/projects/get-projects-of-interest";
import { Project } from "../project";

export async function ProjectsOfinterest({ userEmail }: { userEmail: string }) {
    const projects = await getProjectsOfInterest(userEmail);

    console.log({ projects, userEmail });

    return (
        <div>
            {projects.map((project) => (
                <Project project={project} key={project.id} />
            ))}
        </div>
    );
}
