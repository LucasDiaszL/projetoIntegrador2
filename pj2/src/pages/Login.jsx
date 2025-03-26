import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700"
          >
            Sign in
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
  );
}

export default Login;
