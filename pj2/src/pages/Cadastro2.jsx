import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    endereco: "",
    cpf: "",
    telefone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados cadastrados:", formData);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFEEF9]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Cadastro
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                maxLength="14"
                placeholder="000.000.000-00"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                maxLength="15"
                placeholder="(00) 00000-0000"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Botão de Cadastro */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#494D7E] text-white px-3 py-1.5 rounded-md hover:bg-[#2B3396] cursor-pointer"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">
              Voltar para Login
            </Link>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cadastro;
