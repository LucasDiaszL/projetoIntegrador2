// src/pages/EditarPerfil.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const onlyDigits = (s = "") => String(s).replace(/\D/g, "");

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    endereco: "",
    telefone: ""
  });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr) { setErr("Não foi possível validar sua sessão."); setLoading(false); return; }
      if (!user) { navigate("/login"); return; }
      setUser(user);

      const { data: c, error } = await supabase
        .from("clientes")
        .select("nome, email, cpf, endereco, telefone")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        setFormData({
          nome: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
          email: user.email || "",
          cpf: "",
          endereco: "",
          telefone: ""
        });
      } else {
        setFormData({
          nome: c?.nome || "",
          email: c?.email || user.email || "",
          cpf: c?.cpf || "",
          endereco: c?.endereco || "",
          telefone: c?.telefone || ""
        });
      }
      setLoading(false);
    })();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user?.id) { setErr("Usuário não identificado."); return; }

    setSaving(true);
    const { error } = await supabase
      .from("clientes")
      .update({
        nome: formData.nome,
        email: formData.email,
        cpf: onlyDigits(formData.cpf),
        endereco: formData.endereco,
        telefone: onlyDigits(formData.telefone)
      })
      .eq("id", user.id);
    setSaving(false);

    if (error) {
      console.error("Erro ao atualizar perfil:", error);
      setErr(error.message || "Erro ao atualizar o perfil.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      id: user.id,
      nome: formData.nome,
      email: formData.email,
      cpf: onlyDigits(formData.cpf),
      endereco: formData.endereco,
      telefone: onlyDigits(formData.telefone),
    }));

    navigate("/perfil");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] mb-20 flex flex-col justify-center items-center bg-[#EFEEF9] py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Editar Perfil</h2>
          <p className="text-gray-700 mb-6 text-center">Edite suas informações e clique em “Salvar”.</p>

          {loading ? (
            <div className="text-center py-8">Carregando…</div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {err && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">{err}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#494D7E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#494D7E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">CPF</label>
                <IMaskInput
                  mask="000.000.000-00"
                  name="cpf"
                  value={formData.cpf}
                  onAccept={(value) => setFormData((s) => ({ ...s, cpf: value }))}
                  className="block w-full rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#494D7E]"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#494D7E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <IMaskInput
                  mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
                  name="telefone"
                  value={formData.telefone}
                  onAccept={(value) => setFormData((s) => ({ ...s, telefone: value }))}
                  className="block w-full rounded-md bg-white px-3 py-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#494D7E]"
                  inputMode="tel"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
