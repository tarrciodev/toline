import { CreateProjectForm } from "@/components/forms/create-project-form";

export default function NewProject() {
    return (
        <main className='py-10 flex justify-center'>
            <div className='bg-white p-8'>
                <CreateProjectForm />
            </div>
        </main>
    );
}
