import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function SupportPanel() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatSel, setChatSel] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);

  // autenticação + papel (clientes.tipo_usuario) + lista de chats se staff
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: { user }, error: eUser } = await supabase.auth.getUser();
      if (eUser) console.error(eUser);
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      // papel primário em clientes; fallback profiles.role
      let papel = null;
      const { data: cli } = await supabase
        .from("clientes")
        .select("tipo_usuario")
        .eq("id", user.id)
        .maybeSingle();
      if (cli?.tipo_usuario) {
        papel = cli.tipo_usuario;
      } else {
        const { data: pf } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        papel = pf?.role ?? null;
      }
      setRole(papel);

      const isStaff = ["suporte", "atendente", "admin"].includes(papel || "");
      if (isStaff) {
        // traz dados do cliente via FK (cliente_id -> clientes.id)
        const { data, error } = await supabase
          .from("chats")
          .select(`
            id,
            cliente_id,
            status,
            criado_em,
            cliente:cliente_id ( id, nome, email )
          `)
          .order("criado_em", { ascending: false });

        if (error) console.error(error);
        setChats(data || []);
        if (!chatSel && data?.length) setChatSel(data[0].id);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // carregar mensagens + realtime do chat selecionado
  useEffect(() => {
    if (!chatSel) return;

    let channel;

    (async () => {
      const { data, error } = await supabase
        .from("mensagens")
        .select("*")
        .eq("chat_id", chatSel)
        .order("criado_em", { ascending: true });

      if (error) console.error(error);
      setMsgs(data || []);

      channel = supabase
        .channel(`mensagens:suporte:${chatSel}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "mensagens", filter: `chat_id=eq.${chatSel}` },
          (payload) => setMsgs((prev) => [...prev, payload.new])
        )
        .subscribe();
    })();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [chatSel]);

  async function enviar() {
    if (!texto.trim() || !userId || !chatSel) return;
    const { error } = await supabase
      .from("mensagens")
      .insert({ chat_id: chatSel, autor_id: userId, texto: texto.trim() });
    if (error) { console.error(error); return; }
    setTexto("");
  }

  if (loading) return <div className="p-4">Carregando…</div>;
  if (!userId) return <div className="p-4">Faça login.</div>;
  if (!["suporte", "atendente", "admin"].includes(role || "")) {
    return <div className="p-4">Acesso restrito ao suporte.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-80 bg-gray-100 border-r p-4">
        <h2 className="text-lg font-semibold mb-3">Chats</h2>
        <ul className="space-y-2">
          {(chats || []).map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setChatSel(c.id)}
                className={`w-full text-left p-2 rounded ${
                  c.id === chatSel ? "bg-[var(--color-primary)] text-white" : "hover:bg-gray-200"
                }`}
              >
                <div className="text-sm">
                  <div className="font-semibold">{c.cliente?.nome || "Cliente"}</div>
                  <div className="text-xs opacity-70">{c.cliente?.email || c.cliente_id?.slice(0,8)}</div>
                  <div className="text-xs mt-1"><strong>Status:</strong> {c.status}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 flex flex-col">
        {chatSel ? (
          <>
            <div className="flex-1 overflow-y-auto border p-4 rounded bg-white shadow">
              <h3 className="text-lg font-semibold mb-4">Conversa</h3>
              <div className="flex flex-col space-y-2 text-sm">
                {(msgs || []).map((m) => (
                  <div key={m.id} className={`p-2 rounded max-w-[70%] ${
                    m.autor_id === userId
                      ? "bg-[var(--color-primary)] text-white self-end"
                      : "bg-gray-100 self-start"
                  }`}>
                    <span className="block text-[11px] opacity-70 mb-1">
                      {m.autor_id === userId ? "Suporte" : "Cliente"}
                    </span>
                    {m.texto}
                    <div className="text-[10px] opacity-60 mt-1">
                      {m.criado_em ? new Date(m.criado_em).toLocaleString() : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex">
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviar()}
                placeholder="Digite sua resposta…"
                className="flex-1 border p-2 rounded mr-2"
              />
              <button onClick={enviar} className="bg-[var(--color-primary)] text-white px-4 py-2 rounded">
                Enviar
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Selecione um chat à esquerda para começar.</p>
        )}
      </main>
    </div>
  );
}
