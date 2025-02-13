interface IResetPasswordTemplateProps {
    token: string;
}

import { Body, Head, Html } from "@react-email/components";

export default function ResetPasswordTemplate({
    token,
}: IResetPasswordTemplateProps) {
    return (
        <Html>
            <Head />
            <Body>{token}</Body>
        </Html>
    );
}
