import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import bcrypt from 'bcryptjs';
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
    
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      
      // Buscar usuário pelo email no Supabase
      const { data: user, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("email", email)
        .single();
      
      if (error) {
        if (error.code === "PGRST116") {
          setMessage({ type: "error", text: "Email ou senha incorretos" });
        } else {
          throw error;
        }
        return;
      }
      
      if (!user) {
        setMessage({ type: "error", text: "Email ou senha incorretos" });
        return;
      }
      
      // Verificar a senha usando bcrypt
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      
      if (!passwordMatch) {
        setMessage({ type: "error", text: "Email ou senha incorretos" });
        return;
      }
      
      // Login bem-sucedido
      setMessage({ type: "success", text: "Login realizado com sucesso!" });
      
      // Salvar informações do usuário (exceto a senha) no localStorage
      const { senha: _, ...userInfo } = user;
      localStorage.setItem("user", JSON.stringify(userInfo));
      
      // Redirecionar para a página principal
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage({ 
        type: "error", 
        text: `Ocorreu um erro ao fazer login: ${error.message}` 
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
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
