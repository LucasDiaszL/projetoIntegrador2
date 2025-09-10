import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
    return (
        <>
            <Navbar />
            <div className="searchDiv grid gap-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem] ">
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Termos e Condições de Uso</h1>

                    <p className="text-gray-700 mb-4">
                        Bem-vindo ao <strong>ServiGo</strong>, uma plataforma digital que conecta clientes a prestadores de serviços de forma geolocalizada, rápida e eficiente. Ao utilizar o ServiGo, você concorda com os termos descritos a seguir.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Aceitação dos Termos</h2>
                    <p className="text-gray-700 mb-4">
                        O uso do aplicativo ServiGo implica na aceitação integral destes termos. Caso não concorde com alguma das cláusulas, recomendamos que não utilize nossos serviços.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Cadastro e Autenticação</h2>
                    <p className="text-gray-700 mb-4">
                        Para acessar os recursos do ServiGo, o usuário deve criar uma conta autenticada via Supabase, fornecendo informações verdadeiras. O uso indevido de dados pode acarretar suspensão ou exclusão da conta.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Serviços Oferecidos</h2>
                    <p className="text-gray-700 mb-4">
                        O ServiGo oferece funcionalidades como busca de prestadores com base na localização, agendamento de atendimentos, chat integrado e sistema de avaliações. A plataforma atua como intermediadora, não se responsabilizando pela execução dos serviços contratados.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Regras para Prestadores e Clientes</h2>
                    <p className="text-gray-700 mb-4">
                        Ambas as partes devem manter conduta ética e respeitosa. Prestadores devem cumprir os serviços agendados com pontualidade e qualidade. Clientes devem fornecer informações corretas e comparecer aos compromissos agendados.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Cancelamentos e Reembolsos</h2>
                    <p className="text-gray-700 mb-4">
                        Cancelamentos devem ser realizados com no mínimo 24h de antecedência. Para mais informações, consulte nossa <a href="/hire" className="text-blue-600 hover:underline">Política de Reembolso</a>.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Privacidade e Notificações</h2>
                    <p className="text-gray-700 mb-4">
                        O ServiGo utiliza notificações em tempo real e coleta dados de localização para melhorar sua experiência. Os dados são tratados conforme nossa política de privacidade.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Atualizações dos Termos</h2>
                    <p className="text-gray-700 mb-4">
                        Estes termos podem ser atualizados periodicamente. Recomendamos que revise esta página regularmente.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8. Contato</h2>
                    <p className="text-gray-700 mb-4">
                        Dúvidas ou sugestões? Entre em contato através da nossa página de <a href="/suporte" className="text-blue-600 hover:underline">Suporte</a>.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;