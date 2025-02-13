import { DashHeader } from "@/components/dash-header";
import { CreateProjectForm } from "@/components/forms/create-project-form";

export default function NewProject() {
    return (
        <div>
            <DashHeader />
            <div className='px-40 py-10 flex justify-center'>
                <div className='bg-white p-8'>
                    <CreateProjectForm />
                </div>
            </div>
        </div>
    );
}
