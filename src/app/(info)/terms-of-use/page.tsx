import Link from "next/link";

export default function TermsOfUse() {
    return (
        <div>
            <h1 className='text-xl sm:text-3xl font-bold mb-4'>
                Termos de Uso
            </h1>
            <p className='mb-4'>
                Ao utilizar a plataforma TOOLINE, você concorda com os seguintes
                termos e condições.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                1. Aceitação dos Termos
            </h2>
            <p className='mb-4'>
                Ao acessar a plataforma, você aceita estar vinculado a estes
                termos.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                2. Responsabilidades do Usuário
            </h2>
            <p className='mb-4'>
                - Manter suas informações atualizadas.
                <br />- Não compartilhar sua conta com terceiros.
                <br />- Usar a plataforma apenas para fins legais.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                3. Propriedade Intelectual
            </h2>
            <p className='mb-4'>
                Os conteúdos gerados são de propriedade dos respectivos
                usuários.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                4. Direitos do Usuário
            </h2>
            <p className='mb-4'>
                Você tem o direito de:
                <br />- Acessar e corrigir seus dados pessoais.
                <br />- Solicitar a exclusão de seus dados (em determinadas
                circunstâncias).
                <br />- Opor-se ao uso de seus dados para marketing.
                <br />- Limitar o processamento de seus dados.
                <br />- Solicitar a portabilidade de seus dados.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                5. Marketing e Comunicações
            </h2>
            <p className='mb-4'>
                Podemos enviar e-mails com ofertas e atualizações sobre a
                plataforma. Você pode optar por não receber essas comunicações a
                qualquer momento.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                6. Limitação de Responsabilidade
            </h2>
            <p className='mb-4'>
                A TOLINE não será responsável por danos indiretos, como perda de
                lucros ou interrupção de negócios, decorrentes do uso da
                plataforma.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                7. Rescisão de Conta
            </h2>
            <p className='mb-4'>
                Reservamo-nos o direito de suspender ou encerrar contas que
                violarem estes termos.
            </p>

            <Link
                href='/privacy-policy'
                className='text-blue-600 hover:underline'
            >
                Leia nossa Política de Privacidade
            </Link>
        </div>
    );
}
