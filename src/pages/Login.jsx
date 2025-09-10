import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1) Login pelo Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (error) throw error;

      const user = data.user;

      // 2) Garante role no JWT (se não tiver, seta padrão como cliente)
      if (!user.user_metadata?.role) {
        await supabase.auth.updateUser({
          data: { role: "cliente" },
        });
      }

      // 3) Salvar infos básicas no localStorage para Navbar
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role || "cliente",
        })
      );

      // 4) Mensagem de sucesso + redirect
      setMessage({ type: "success", text: "Login realizado com sucesso!" });
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setMessage({
        type: "error",
        text:
          err?.message?.toLowerCase().includes("invalid login") ||
          err?.status === 400
            ? "Email ou senha incorretos."
            : "Ocorreu um erro ao fazer login.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-[#EFEEF9]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow">
          {message.text && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#494D7E] text-white px-3 py-1.5 rounded-md hover:bg-[#2B3396] cursor-pointer disabled:bg-gray-400"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

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
