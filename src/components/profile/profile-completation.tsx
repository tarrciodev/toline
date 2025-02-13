import { Progress } from "../ui/progress";

export function ProfileCompletation({
    profileCompletation,
    legended = false,
}: {
    profileCompletation: number;
    legended?: boolean;
}) {
    return (
        <div className='flex flex-col'>
            {legended || (
                <span className='text-purple-800 text-4xl'>
                    {profileCompletation}%
                </span>
            )}
            {legended && <p>Perfil preenchido (50%)</p>}
            <Progress value={profileCompletation} />
            {profileCompletation < 100 && (
                <span className='text-sm text-red-600'>Perfil incompleto</span>
            )}
        </div>
    );
}
