import { SelectedFreelancer } from "../selected-freelancer";
import { Card, CardContent } from "../ui/card";

interface IProjectDetailFreelancerProps {
    project: {
        id: string;
        status: "Em andamento" | "Concluido";
        owner: {
            id: string;
        };
    };
    freelancer?: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
}
export function ProjectDetailsFreelancer({
    project,
    freelancer,
}: IProjectDetailFreelancerProps) {
    return (
        <div>
            <p className='font-semibold text-lg'>Freelancer</p>

            {freelancer ? (
                <SelectedFreelancer
                    ownerId={project.owner?.id as string}
                    projectStatus={project.status}
                    projectId={project.id}
                    freelancer={freelancer}
                />
            ) : (
                <Card>
                    <CardContent>
                        <div className='p-4'>
                            Quando você iniciar um projeto, você pode selecionar
                            um freelancer para o seu projeto. Eles serão
                            responsáveis por executar o projeto e fazer as
                            entregas.
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
