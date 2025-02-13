import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Tailwind,
    Text,
} from "@react-email/components";

interface IProjectCreatedEmail {
    project: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
    };
}

export function NewProjectNotification({ project }: IProjectCreatedEmail) {
    return (
        <Html>
            <Head />
            <Body>
                <Preview>Novo projecto Criado na toline</Preview>
                <Tailwind>
                    <Heading>Ola,</Heading>
                    <Text>Há um novo projeto disponível no Toline:</Text>
                    <Container>
                        <Heading>{project.name}</Heading>
                        <Text>{project.description}</Text>
                        <Hr />
                        <Text>
                            <Link
                                href={`${process.env.SITE_URL as string}/dash/project/${project.id}`}
                            >
                                Ver projeto
                            </Link>
                        </Text>
                    </Container>
                </Tailwind>
            </Body>
        </Html>
    );
}
