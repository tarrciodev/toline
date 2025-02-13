import { Can } from "../can";
import { ProfileCompletation } from "./profile-completation";

interface IuserProfileCompletation {
    projects?: {
        id: string;
        status: string;
        name: string;
        description: string;
    }[];
    certifications: number;
    createdAt: string;
    skills: number;
    profileCompletation: number;
    entityType: string;
}

export function ProfileSideBar({
    projects,
    certifications,
    createdAt,
    skills,
    profileCompletation,
    entityType,
}: IuserProfileCompletation) {
    console.log({ profileCompletation });
    return (
        <div className='bg-white p-8 flex flex-col gap-1'>
            <h1 className='font-semibold text-xl mb-3'>dados do Perfil</h1>
            <div className='my-1'>
                <ProfileCompletation
                    profileCompletation={profileCompletation}
                />
                {entityType === "freelancer" && (
                    <div className='my-3'>
                        <p className='flex justify-between font-light'>
                            Escreva um texto que descreva você ou sua empresa{" "}
                            <span className='text-green-600'>10%</span>
                        </p>
                        <p className='flex justify-between font-light'>
                            Carregar a sua foto de perfil ou logotipo{" "}
                            <span className='text-green-600'>10%</span>
                        </p>
                        <p className='flex justify-between font-light'>
                            Fazer upload do seu BI{" "}
                            <span className='text-green-600'>20%</span>
                        </p>
                    </div>
                )}
            </div>
            <div className='flex flex-col'>
                <p className='w-full flex justify-between'>
                    Projetos Completados:{" "}
                    <span>
                        {projects?.filter(
                            (project) => project.status === "Completado"
                        ).length ?? 0}
                    </span>
                </p>
                <p className='w-full flex justify-between'>
                    Projetos Em andamento:{" "}
                    <span>
                        {projects?.filter(
                            (project) => project.status !== "Completado"
                        ).length ?? 0}
                    </span>
                </p>
            </div>
            <Can who='freelancer'>
                <div>
                    <p className='w-full flex justify-between'>
                        Certificações: <span>{certifications}</span>
                    </p>
                </div>
            </Can>
            <Can who='freelancer'>
                <div>
                    <p className='w-full flex justify-between'>
                        Skills: <span>{skills}</span>
                    </p>
                </div>
            </Can>
            <div>
                <p className='w-full flex justify-between'>
                    Data de Cadastro: <span>{createdAt}</span>
                </p>
            </div>
        </div>
    );
}
