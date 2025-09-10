import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const About = () => {

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 min-h-[60vh] mb-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
        <p className="text-lg text-gray-700 mb-4">
          Nosso site é uma plataforma inovadora que conecta pessoas a prestadores de serviços de forma rápida, prática e segura.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Se você precisa de ajuda com tarefas como consertos domésticos, aulas particulares, assistência técnica, beleza, entre outros, aqui é o lugar certo para encontrar profissionais avaliados por outros usuários.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Já para os prestadores de serviço, oferecemos um espaço gratuito para divulgar seus serviços, alcançar novos clientes e aumentar sua renda. Criar um perfil é fácil, e você pode começar a receber pedidos em poucos minutos.
        </p>
        <p className="text-lg text-gray-700">
          Nosso objetivo é simplificar o acesso a serviços, valorizando o trabalho local e promovendo uma comunidade mais conectada.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
