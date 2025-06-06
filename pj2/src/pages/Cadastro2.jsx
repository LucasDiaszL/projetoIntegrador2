import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from "react-imask";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Schema de validação usando Yup
const clienteSchema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Formato de email inválido"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  endereco: yup.string().optional(),
  tipo_usuario: yup
    .string()
    .required("Tipo de usuário é obrigatório")
    .oneOf(["cliente", "prestador"], "Tipo de usuário inválido"),
});

function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clienteSchema),
    defaultValues: {
      tipo_usuario: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Proteção contra tentativa de cadastrar como admin
      if (data.tipo_usuario === "admin") {
        setMessage({
          type: "error",
          text: "Não é possível cadastrar um administrador por este formulário.",
        });
        return;
      }

      // Verificar email duplicado
      const { data: existingUser, error: checkError } = await supabase
        .from("clientes")
        .select("email")
        .eq("email", data.email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }

      if (existingUser) {
        setMessage({
          type: "error",
          text: "Este email já está cadastrado",
        });
        return;
      }

      // Criptografar a senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(data.senha, salt);

      // Inserir cliente/prestador
      const { error } = await supabase.from("clientes").insert([
        {
          nome: data.nome,
          email: data.email,
          senha: senhaHash,
          cpf: cpf.replace(/\D/g, "") || null,
          cnpj: cnpj.replace(/\D/g, "") || null,
          telefone: telefone.replace(/\D/g, "") || null,
          endereco: data.endereco || null,
          tipo_usuario: data.tipo_usuario, // novo campo
        },
      ]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Cadastro realizado com sucesso!",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage({
        type: "error",
        text: `Erro ao cadastrar: ${error.message}`,
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
            Cadastro
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

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                {...register("nome")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${
                  errors.nome ? "outline-red-500" : "outline-gray-300"
                } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="digiteseuemail@gmail.com"
                {...register("email")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${
                  errors.email ? "outline-red-500" : "outline-gray-300"
                } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite uma senha com no mínimo 6 caracteres"
                {...register("senha")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${
                  errors.senha ? "outline-red-500" : "outline-gray-300"
                } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                placeholder="Digite seu endereço completo"
                {...register("endereco")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Tipo de Usuário */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de usuário
              </label>
              <select
                {...register("tipo_usuario")}
                defaultValue=""
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${
                  errors.tipo_usuario ? "outline-red-500" : "outline-gray-300"
                } focus:outline-[#494D7E]`}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="cliente">Cliente</option>
                <option value="prestador">Prestador de serviço</option>
              </select>
              {errors.tipo_usuario && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tipo_usuario.message}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CPF (apenas números)
              </label>
              <IMaskInput
                mask="000.000.000-00"
                type="text"
                value={cpf}
                onAccept={(value) => setCpf(value)}
                maxLength="14"
                placeholder="000.000.000-00"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* CNPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CNPJ (apenas números, opcional)
              </label>
              <IMaskInput
                mask="00.000.000/0000-00"
                type="text"
                value={cnpj}
                onAccept={(value) => setCnpj(value)}
                maxLength="18"
                placeholder="00.000.000/0000-00"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone (apenas números)
              </label>
              <IMaskInput
                mask="(00) 00000-0000"
                type="tel"
                value={telefone}
                onAccept={(value) => setTelefone(value)}
                maxLength="15"
                placeholder="(00) 00000-0000"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-[#494D7E]"
              />
            </div>

            {/* Botão */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#494D7E] text-white px-3 py-1.5 rounded-md hover:bg-[#2B3396] cursor-pointer disabled:bg-gray-400"
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link to="/Login" className="text-indigo-600 hover:underline">
              Voltar para Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cadastro;
