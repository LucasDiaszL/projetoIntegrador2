import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Termos e Condições</h1>

                <p className="text-gray-700 mb-4">
                    Ao utilizar nossos serviços, você concorda com os seguintes termos e condições. Recomendamos que leia com atenção.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Uso dos Serviços</h2>
                <p className="text-gray-700 mb-4">
                    O uso dos nossos serviços é permitido apenas para fins legais e conforme as normas estabelecidas. Qualquer uso indevido poderá resultar na suspensão do serviço.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Responsabilidades do Usuário</h2>
                <p className="text-gray-700 mb-4">
                    O usuário é responsável por fornecer informações verídicas e manter a confidencialidade dos seus dados de acesso. Qualquer atividade realizada com sua conta será de sua responsabilidade.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Política de Cancelamento e Reembolso</h2>
                <p className="text-gray-700 mb-4">
                    Cancelamentos e reembolsos estão sujeitos à nossa <a href="/hire" className="text-blue-600 hover:underline">Política de Reembolso</a>. Leia-a atentamente antes de efetuar qualquer solicitação.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Modificações</h2>
                <p className="text-gray-700 mb-4">
                    Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos verificar esta página regularmente para se manter atualizado.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Contato</h2>
                <p className="text-gray-700 mb-4">
                    Em caso de dúvidas sobre nossos termos, entre em contato pelo nosso canal de <a href="/suporte" className="text-blue-600 hover:underline">suporte</a>.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;