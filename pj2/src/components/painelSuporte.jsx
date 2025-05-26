import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function PainelSuporte() {
  const [chats, setChats] = useState([]);
  const [chatSelecionado, setChatSelecionado] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from('chats')
        .select('id, cliente_id, criado_em')
        .order('criado_em', { ascending: false });

      setChats(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!chatSelecionado) return;

    async function carregarMensagens() {
      const { data } = await supabase
        .from('mensagens')
        .select('*')
        .eq('chat_id', chatSelecionado)
        .order('criado_em', { ascending: true });

      setMensagens(data);
    }

    carregarMensagens();

    const canal = supabase
      .channel('mensagens-suporte')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensagens',
          filter: `chat_id=eq.${chatSelecionado}`
        },
        (payload) => {
          setMensagens((msgs) => [...msgs, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [chatSelecionado]);

  async function enviarMensagem() {
    if (!novaMensagem.trim() || !userId || !chatSelecionado) return;

    await supabase.from('mensagens').insert({
      texto: novaMensagem,
      chat_id: chatSelecionado,
      autor_id: userId
    });

    setNovaMensagem('');
  }

  return (
    <div className="flex min-h-screen">
      {/* Lista de chats */}
      <aside className="w-1/4 bg-gray-100 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Chats Ativos</h2>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setChatSelecionado(chat.id)}
              className={`cursor-pointer p-2 rounded ${
                chatSelecionado === chat.id ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-200'
              }`}
            >
              Cliente: {chat.cliente_id.slice(0, 8)}...
            </li>
          ))}
        </ul>
      </aside>

      {/* Área do chat */}
      <main className="flex-1 p-6 flex flex-col">
        {chatSelecionado ? (
          <>
            <div className="flex-1 overflow-y-auto border p-4 rounded bg-white shadow">
              <h3 className="text-lg font-semibold mb-4">Conversa</h3>
              <div className="space-y-2 text-sm">
                {mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded ${
                      msg.autor_id === userId ? 'bg-[var(--color-primary)] text-white self-end' : 'bg-gray-100'
                    }`}
                  >
                    {msg.texto}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex">
              <input
                type="text"
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                placeholder="Digite sua resposta..."
                className="flex-1 border p-2 rounded mr-2"
              />
              <button
                onClick={enviarMensagem}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded"
              >
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
