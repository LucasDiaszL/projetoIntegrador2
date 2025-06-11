import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ = () => {

  //PERGUNTAS DO GPT, ARRUMAR DEPOIS DE ACORDO COM
  return (
    <>
      <Navbar />
      <div className="searchDiv grid gap-10 bg-[var(--color-neutralSilver)] rounded-[10px] p-[3rem] ">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl">
          <h1 className="text-4xl font-bold text-center mb-8">Perguntas Frequentes</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Como funciona a plataforma?</h2>
              <p className="text-gray-700 mt-2">
                A plataforma conecta usuários a prestadores de serviço. Você pode buscar profissionais por categoria, verificar avaliações e entrar em contato diretamente com quem desejar contratar.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Preciso pagar para usar?</h2>
              <p className="text-gray-700 mt-2">
                Não. O uso da plataforma é gratuito tanto para quem procura serviços quanto para quem oferece. Pode haver custos pelo serviço prestado, combinados entre cliente e profissional.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Como me cadastro como prestador de serviço?</h2>
              <p className="text-gray-700 mt-2">
                Basta criar uma conta e preencher seu perfil com informações sobre os serviços que oferece. Em poucos minutos você já pode começar a receber pedidos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Os profissionais são avaliados?</h2>
              <p className="text-gray-700 mt-2">
                Sim. Após a realização de um serviço, os usuários podem deixar avaliações e comentários sobre sua experiência, ajudando outros usuários a escolher com mais segurança.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Como entrar em contato com o suporte?</h2>
              <p className="text-gray-700 mt-2">
                Você pode acessar a aba de contato no menu principal ou enviar um e-mail para suporte@seudominio.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
