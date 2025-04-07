import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aqui você poderia adicionar lógica de autenticação antes de redirecionar
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFEEF9]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Senha
              </label>
              <input
                type="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#494D7E] text-white px-3 py-1.5 rounded-md hover:bg-[#2B3396] cursor-pointer"
            >
              Entrar
            </button>
          </form>

          {/* 🔹 Botão para ir para o Cadastro */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-indigo-600 hover:underline">
              Criar Conta
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
