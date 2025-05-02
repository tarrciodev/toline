import { Briefcase, Calendar, CheckCircle, FileText, Send } from "lucide-react";

export function ProjectCard({
    title = "toline-storage",
    // status = "sent", // sent, accepted, completed
    category = "TI e Desenvolvimento",
    date = "30/04/2025",
    proposalsCount = 1,
    description = "Sistema de gerenciamento de armazenamento para otimizar e monitorar recursos em tempo real. Interface intuitiva com dashboards e alertas configuráveis.",
    skills = ["React", "Node.js", "API REST", "MongoDB", "Docker"],
    client = {
        name: "Toline Angola",
        initial: "T",
    },
}) {
    // Status badge configurations
    const statusConfig = {
        sent: {
            text: "Proposta Enviada",
            badgeClass: "bg-blue-100 text-blue-600",
            icon: Send,
        },
        accepted: {
            text: "Proposta Aceita",
            badgeClass: "bg-green-100 text-green-600",
            icon: CheckCircle,
        },
        completed: {
            text: "Projeto Concluído",
            badgeClass: "bg-purple-100 text-purple-600",
            icon: CheckCircle,
        },
    };

    const currentStatus = statusConfig.sent;
    const StatusIcon = currentStatus.icon;

    return (
        <div className='bg-white rounded-lg shadow p-6 transition-all hover:shadow-md hover:-translate-y-1'>
            <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold text-blue-600'>{title}</h3>
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${currentStatus.badgeClass}`}
                >
                    <StatusIcon size={14} className='mr-1' />
                    {currentStatus.text}
                </span>
            </div>

            <div className='flex flex-wrap gap-4 mb-4 text-gray-500 text-sm'>
                <div className='flex items-center'>
                    <Briefcase size={16} className='mr-2' />
                    <span>{category}</span>
                </div>
                <div className='flex items-center'>
                    <Calendar size={16} className='mr-2' />
                    <span>
                        Data:{" "}
                        <span className='text-blue-600 font-medium'>
                            {date}
                        </span>
                    </span>
                </div>
                <div className='flex items-center'>
                    <FileText size={16} className='mr-2' />
                    <span>
                        Propostas:{" "}
                        <span className='text-blue-600 font-medium'>
                            {proposalsCount}
                        </span>
                    </span>
                </div>
            </div>

            <p className='mb-4 text-gray-700'>{description}</p>

            <h4 className='font-medium mb-2'>Habilidades</h4>
            <div className='flex flex-wrap gap-2 mb-4'>
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className='bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium'
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <div className='flex items-center pt-4 mt-4 border-t border-gray-200'>
                <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3'>
                    {client.initial}
                </div>
                <span className='font-medium'>{client.name}</span>
            </div>
        </div>
    );
}
