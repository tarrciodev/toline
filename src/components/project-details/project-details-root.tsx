import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export function ProjectDetailsRoot({ children }: { children: ReactNode }) {
    return (
        <Card>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
