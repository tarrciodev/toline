import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div>
            <h1 className='text-xl sm:text-3xl font-bold mb-4'>
                Política de Privacidade
            </h1>
            <p className='mb-4'>
                A TOOLINE valoriza a privacidade dos seus usuários e segue as
                diretrizes descritas abaixo.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                1. Coleta de Dados
            </h2>
            <p className='mb-4'>
                - Informações de cadastro: nome, e-mail, telefone.
                <br />- Dados de uso: IP, localização, cookies.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                2. Uso dos Dados
            </h2>
            <p className='mb-4'>
                - Para fornecer e manter os serviços.
                <br />- Personalizar a experiência do usuário.
                <br />- Garantir a segurança da plataforma.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                3. Segurança dos Dados
            </h2>
            <p className='mb-4'>
                Seus dados são armazenados em servidores seguros com acesso
                restrito.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                4. Seus Direitos
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
                5. Cookies e Tecnologias Similares
            </h2>
            <p className='mb-4'>
                Utilizamos cookies para melhorar sua experiência, personalizar
                anúncios e analisar tráfego.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                6. Alterações na Política de Privacidade
            </h2>
            <p className='mb-4'>
                Reservamo-nos o direito de atualizar esta política
                periodicamente. Notificaremos os usuários sobre mudanças
                significativas.
            </p>

            <h2 className='text-lg sm:text-xl font-semibold mt-4'>
                7. Contato
            </h2>
            <p className='mb-4'>
                Dúvidas? Envie um e-mail para: tolinegeral@hotmail.com
            </p>

            <Link
                href='/terms-of-use'
                className='text-blue-600 hover:underline'
            >
                Leia nossos Termos de Uso
            </Link>
        </div>
    );
}
