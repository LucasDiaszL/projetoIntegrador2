import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Hire = () => {
  return (
    <>
      <Navbar />
      <div className="searchDiv grid gap-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem] ">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Política de Reembolso</h1>

          <p className="text-gray-700 mb-4">
            A Política de Reembolso do <strong>ServiGo</strong> foi criada para proteger tanto os clientes quanto os prestadores de serviço que utilizam nossa plataforma. Ela estabelece critérios justos e transparentes para situações em que o reembolso pode ser solicitado.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Solicitação de Reembolso</h2>
          <p className="text-gray-700 mb-4">
            O reembolso pode ser solicitado pelo cliente diretamente pelo aplicativo, através do nosso canal de suporte, em até 48 horas após o horário agendado do serviço, desde que atenda aos critérios abaixo.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Casos Elegíveis para Reembolso</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>O prestador não compareceu no horário agendado sem aviso prévio.</li>
            <li>O serviço foi cancelado pelo prestador com menos de 12 horas de antecedência.</li>
            <li>O serviço não foi realizado conforme a descrição ou houve má conduta do prestador.</li>
            <li>Houve erro técnico na plataforma que impossibilitou a realização do agendamento.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Casos Não Elegíveis</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Cancelamentos feitos pelo cliente com menos de 6 horas de antecedência.</li>
            <li>Insatisfação subjetiva sem comprovação de falhas no serviço prestado.</li>
            <li>Problemas decorrentes de condições externas (como clima, trânsito ou atrasos justificados).</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Processo de Avaliação</h2>
          <p className="text-gray-700 mb-4">
            Após a solicitação, nossa equipe analisará o caso em até 3 dias úteis. O cliente será notificado via chat e e-mail sobre a decisão. Podemos solicitar informações adicionais, como capturas de tela, mensagens ou relatos via chat do ServiGo.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Forma de Reembolso</h2>
          <p className="text-gray-700 mb-4">
            O valor será reembolsado pelo mesmo método de pagamento utilizado na contratação do serviço, podendo levar até 7 dias úteis após a aprovação.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Contato e Suporte</h2>
          <p className="text-gray-700 mb-4">
            Para solicitar reembolso ou esclarecer dúvidas, acesse a área de <a href="/suporte" className="text-blue-600 hover:underline">Suporte</a> no aplicativo ou pelo site.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hire;
