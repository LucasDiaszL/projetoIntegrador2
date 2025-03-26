import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Sistema</h1>
      <p className="mt-2 text-gray-700">Cadastre-se para começar</p>
      <Link
        to="/cadastro"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Ir para Cadastro
      </Link>
    </div>
  );
}

export default Home;
