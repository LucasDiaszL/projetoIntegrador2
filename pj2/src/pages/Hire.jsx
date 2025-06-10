import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Hire = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Política de Reembolso</h1>

        <p className="text-gray-700 mb-4">
          Nosso objetivo é garantir sua satisfação com nossos serviços. No entanto, caso seja necessário solicitar um reembolso, as seguintes condições se aplicam:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Solicitações de reembolso devem ser feitas em até <strong>7 dias úteis</strong> após a compra.</li>
          <li>O serviço/produto não pode ter sido utilizado integralmente.</li>
          <li>Reembolsos não se aplicam a serviços personalizados ou sob demanda, exceto em casos de defeito comprovado.</li>
          <li>O valor será devolvido pelo mesmo método de pagamento em até <strong>10 dias úteis</strong>.</li>
        </ul>

        <p className="text-gray-700 mb-4">
          Para iniciar o processo de reembolso, entre em contato com nosso suporte ao cliente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/suporte"
            className="text-blue-600 hover:underline transition"
          >
            Fale com o Suporte
          </a>
          <a
            href="/Termos"
            className="text-blue-600 hover:underline transition"
          >
            Leia os Termos e Condições
          </a>
          <a
            href="/faq"
            className="text-blue-600 hover:underline transition"
          >
            Perguntas Frequentes
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hire;
