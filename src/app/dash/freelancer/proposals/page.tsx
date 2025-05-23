import { getTolinerAsEntity } from "@/actions/toliners/get-entity";
import ProjectsContainer from "./(components)/projects-container";

export default async function page() {
    const freelancer = await getTolinerAsEntity();
    return <ProjectsContainer freelancer={freelancer} />;
}
