import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export function ProjectDetailsRoot({ children }: { children: ReactNode }) {
    return (
        <Card className='sticky top-20 self-start'>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
