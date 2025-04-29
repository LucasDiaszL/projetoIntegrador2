import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMaskInput } from 'react-imask';
import * as yup from "yup";
import bcrypt from 'bcryptjs';
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
  // outros campos...
});

function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(clienteSchema),
    defaultValues: {
      // valores iniciais...
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

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
          text: "Este email já está cadastrado"
        });
        return;
      }

      // Criptografar a senha antes de salvar
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(data.senha, salt);

      // Inserir cliente com senha criptografada
      const { error } = await supabase.from("clientes").insert([
        {
          nome: data.nome,
          email: data.email,
          senha: senhaHash, // Senha criptografada
          cpf: cpf.replace(/\D/g, '') || null,
          cnpj: cnpj.replace(/\D/g, '') || null,
          telefone: telefone.replace(/\D/g, '') || null,
          endereco: data.endereco || null
        }
      ]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Cadastro realizado com sucesso!"
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage({
        type: "error",
        text: `Erro ao cadastrar: ${error.message}`
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
              className={`mb-4 p-3 rounded-md ${message.type === "success"
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
                {...register("nome")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.nome ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.email ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                {...register("senha")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.senha ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                {...register("endereco")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.endereco ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.endereco && (
                <p className="mt-1 text-sm text-red-600">{errors.endereco.message}</p>
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
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.cpf ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-600">{errors.cpf.message}</p>
              )}
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
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.cnpj ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.cnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cnpj.message}</p>
              )}
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
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline ${errors.telefone ? "outline-red-500" : "outline-gray-300"
                  } placeholder-gray-400 focus:outline-[#494D7E]`}
              />
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
              )}
            </div>

            {/* Botão de Cadastro */}
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
            <Link to="/" className="text-indigo-600 hover:underline">
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
