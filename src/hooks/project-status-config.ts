"use client";

import { CheckCircle, Hammer, LucideIcon, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

type EntityType = "client" | "freelancer";

interface StatusConfigResult {
    currentStatus?: {
        text: string;
        badgeClass: string;
        icon: LucideIcon;
    };
    StatusIcon?: LucideIcon;
}

export function useProjectStatusConfig(
    entityType: EntityType
): StatusConfigResult {
    const query =
        useSearchParams().get("query") ??
        (entityType === "freelancer" ? "sent" : "published");

    const statusConfig =
        entityType === "freelancer"
            ? {
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
              }
            : {
                  published: {
                      text: "Projeto Publicado",
                      badgeClass: "bg-blue-100 text-blue-600",
                      icon: Send,
                  },
                  ongoing: {
                      text: "Projetos em Andamento",
                      badgeClass: "bg-green-100 text-green-600",
                      icon: Hammer,
                  },
                  completed: {
                      text: "Projeto Concluído",
                      badgeClass: "bg-purple-100 text-purple-600",
                      icon: CheckCircle,
                  },
              };

    const currentStatus = statusConfig[query as keyof typeof statusConfig];

    return {
        currentStatus: currentStatus,
        StatusIcon: currentStatus?.icon,
    };
}
