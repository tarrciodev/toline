import { CreateProjectForm } from "@/components/forms/create-project-form";

export default function NewProject() {
    return (
        <main className='sm:py-10 flex justify-center w-full'>
            <div className='p-8 bg-white'>
                <CreateProjectForm />
            </div>
        </main>
    );
}
