import { useEffect, useRef, useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { supabase } from "../supabase";

export default function ChatWidget() {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const boxRef = useRef(null);

  // scroll
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [mensagens]);

  // pega user + role e garante chat
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(profile?.role ?? null);

      if (profile?.role === "cliente") {
        await ensureChat(user.id);
      }

      setLoading(false);
    })();
  }, []);

  async function ensureChat(clienteId) {
    // tenta achar um chat existente
    const { data: chats, error: eSel } = await supabase
      .from("chats")
      .select("id")
      .eq("cliente_id", clienteId)
      .order("criado_em", { ascending: false })
      .limit(1);

    if (eSel) console.error(eSel);
    const existente = chats?.[0];

    if (existente) {
      setChatId(existente.id);
      await carregarMensagens(existente.id);
      return;
    }

    // cria novo chat
    const { data: novo, error: eIns } = await supabase
      .from("chats")
      .insert({ cliente_id: clienteId, status: "iniciado" })
      .select("id")
      .single();

    if (eIns) { console.error(eIns); return; }

    setChatId(novo.id);
    await carregarMensagens(novo.id);
  }

  async function carregarMensagens(cid) {
    const { data, error } = await supabase
      .from("mensagens")
      .select("*")
      .eq("chat_id", cid)
      .order("criado_em", { ascending: true });

    if (error) console.error(error);
    setMensagens(data || []);
  }

  async function enviar() {
    if (!mensagem.trim() || !userId || !chatId) return;
    const { error } = await supabase
      .from("mensagens")
      .insert({ chat_id: chatId, autor_id: userId, texto: mensagem });
    if (error) { console.error(error); return; }
    setMensagem("");
  }

  // realtime por chat
  useEffect(() => {
    if (!chatId) return;
    const ch = supabase
      .channel(`mensagens:${chatId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "mensagens",
        filter: `chat_id=eq.${chatId}`,
      }, (payload) => setMensagens((prev) => [...prev, payload.new]))
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [chatId]);

  if (loading) return null;
  if (!userId) return null;           // não logado → sem widget
  if (role !== "cliente") return null; // só cliente vê

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-third)] text-white rounded-full p-4 shadow-lg"
          title="Abrir chat"
        >
          <IoChatbubblesOutline size={22} />
        </button>
      )}

      {aberto && (
        <div className="w-80 h-[420px] bg-white shadow-xl rounded-md flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-[var(--color-primary)] text-white text-sm font-semibold px-4 py-2 flex justify-between items-center">
            <span>Chat</span>
            <button onClick={() => setAberto(false)} className="text-white/90 hover:text-white">✕</button>
          </div>

          <div ref={boxRef} className="flex-1 p-3 overflow-y-auto text-sm text-gray-800">
            {mensagens.length === 0 ? (
              <p className="text-gray-400">Nenhuma mensagem ainda...</p>
            ) : mensagens.map((m) => (
              <div key={m.id} className={`mb-2 p-2 rounded max-w-[80%] ${
                m.autor_id === userId
                  ? "bg-[var(--color-primary)] text-white ml-auto"
                  : "bg-gray-100 text-black mr-auto"
              }`}>
                {m.texto}
                <div className="text-[10px] opacity-60 mt-1">
                  {new Date(m.criado_em).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex border-t px-2 py-2 bg-gray-50">
            <input
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviar()}
              placeholder="Digite sua mensagem…"
              className="flex-1 text-sm p-2 border border-gray-300 rounded"
            />
            <button
              onClick={enviar}
              className="ml-2 px-4 text-sm text-white rounded bg-[var(--color-primary)] hover:bg-[var(--color-third)]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
