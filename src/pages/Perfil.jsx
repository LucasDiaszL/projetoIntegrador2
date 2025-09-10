// src/pages/Perfil.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Butao from "../components/Butao";

function formatCPF(v) {
  const s = typeof v === "string" ? v : "";
  if (!s) return "—";
  return s
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function formatTel(v) {
  const s = typeof v === "string" ? v : "";
  if (!s) return "—";
  const d = s.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export default function Perfil() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [u, setU] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let alive = true;

    async function ensureClienteRow(user) {
      // cria registro básico em clientes (caso não exista)
      const nomeFallback = user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuário";
      const insert = {
        id: user.id,                    // FK para auth.users
        nome: nomeFallback,
        email: user.email ?? null,
        cpf: null,
        endereco: null,
        telefone: null,
        tipo_usuario: "cliente",
      };
      const { error } = await supabase.from("clientes").insert(insert).single();
      if (error && error.code !== "23505") { // 23505 = duplicate key (ok se corrida)
        throw error;
      }
    }

    async function load() {
      try {
        setLoading(true);
        setErrMsg("");

        const { data: { user }, error: eUser } = await supabase.auth.getUser();
        if (eUser) throw eUser;
        if (!user) { navigate("/login"); return; }

        // 1) tenta ler clientes
        let { data: c, error: eCli } = await supabase
          .from("clientes")
          .select("id, nome, email, cpf, endereco, telefone, tipo_usuario")
          .eq("id", user.id)
          .maybeSingle(); // não joga exceção se "no rows"

        if (eCli && eCli.code !== "PGRST116") throw eCli; // erro real

        // 2) se não existir, cria e lê novamente
        if (!c) {
          await ensureClienteRow(user);
          const retry = await supabase
            .from("clientes")
            .select("id, nome, email, cpf, endereco, telefone, tipo_usuario")
            .eq("id", user.id)
            .maybeSingle();
          c = retry.data ?? null;
        }

        // 3) fallback final com dados do auth (para não quebrar UI)
        const payload = c
          ? c
          : {
              id: user.id,
              nome: user.email?.split("@")[0] || "Usuário",
              email: user.email,
              cpf: null,
              endereco: null,
              telefone: null,
              tipo_usuario: "cliente",
            };

        if (!alive) return;
        setU(payload);

        // cache leve p/ UX
        localStorage.setItem("user", JSON.stringify(payload));
      } catch (e) {
        console.error("Erro carregando perfil:", e);
        if (!alive) return;
        setErrMsg(e?.message || "Falha ao carregar perfil");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [navigate]);

  if (loading) return <div className="p-8 text-center">Carregando…</div>;
  if (!u) return <div className="p-8 text-center">Não foi possível carregar seu perfil. {errMsg && <span>({errMsg})</span>}</div>;

  return (
    <div>
      <Navbar />
      <div ref={containerRef} className="min-h-[60vh] mb-20 flex flex-col justify-center items-center bg-[#EFEEF9] py-10 relative">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Perfil</h2>

          {errMsg && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {errMsg}
            </div>
          )}

          <div className="mb-6 space-y-2 text-sm text-gray-800">
            <p><strong>Nome:</strong> {u.nome || "—"}</p>
            <p><strong>Email:</strong> {u.email || "—"}</p>
            <p><strong>CPF:</strong> {formatCPF(u.cpf)}</p>
            <p><strong>Endereço:</strong> {u.endereco || "—"}</p>
            <p><strong>Telefone:</strong> {formatTel(u.telefone)}</p>
            <p><strong>Tipo de usuário:</strong> {u.tipo_usuario || "—"}</p>
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={() => navigate("/editarperfil")} className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
              Editar Perfil
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
        <Butao containerRef={containerRef} />
      </div>
      <Footer />
    </div>
  );
}
