import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (

    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bem-vindo!</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-[var(--color-secundary)] text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Ir para Login
        </button>

        <button
          onClick={() => navigate("/cadastro")}
          className="px-6 py-3 bg-[var(--color-fifth)] text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Ir para Cadastro
        </button>
      </div>
    </div>
    
    </>
  );
}

export default Home;
