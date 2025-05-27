import React, { useState, useEffect, useRef } from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { supabase } from '../supabase';

export default function BotaoAjuda() {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);
  const mensagensRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
    }
  }, [mensagens]);

  // Carrega usuário e inicia chat
  useEffect(() => {
    async function setup() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert('Você precisa estar logado para usar o chat.');
        return;
      }
      setUserId(user.id);
      iniciarChat(user.id);
    }

    setup();
  }, []);

  async function iniciarChat(userId) {
    const { data: chats, error: erroExistente } = await supabase
      .from('chats')
      .select('id')
      .eq('cliente_id', userId)
      .limit(1);

    if (erroExistente) {
      console.error('Erro ao buscar chat:', erroExistente.message);
      return;
    }

    const chatExistente = chats?.[0];

    if (chatExistente) {
      setChatId(chatExistente.id);
      carregarMensagens(chatExistente.id);
      return;
    }

    const { data: novoChat, error: erroCriar } = await supabase
      .from('chats')
      .insert({ cliente_id: userId })
      .select()
      .single();

    if (erroCriar) {
      console.error('Erro ao criar chat:', erroCriar.message);
      return;
    }

    setChatId(novoChat.id);
  }

  async function carregarMensagens(chat_id) {
    const { data } = await supabase
      .from('mensagens')
      .select('*')
      .eq('chat_id', chat_id)
      .order('criado_em', { ascending: true });

    setMensagens(data);
  }

  async function enviarMensagem() {
    if (!mensagem.trim() || !userId || !chatId) return;

    const { error } = await supabase.from('mensagens').insert({
      texto: mensagem,
      chat_id: chatId,
      autor_id: userId
    });

    if (error) {
      console.error('Erro ao enviar mensagem:', error.message);
      alert('Erro ao enviar mensagem');
    }

    setMensagem('');
  }

  // Supabase Realtime listener com log
  useEffect(() => {
    if (!chatId) return;

    console.log('📡 Conectando canal realtime para o chat:', chatId);

    const canal = supabase
      .channel('mensagens-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensagens'
        },
        (payload) => {
          const novaMensagem = payload.new;
          console.log('📥 Realtime recebida:', novaMensagem);
          console.log('🔎 Comparando chat_id local vs payload:', {
            local: chatId,
            recebido: novaMensagem.chat_id
          });

          if (String(novaMensagem.chat_id) === String(chatId)) {
            console.log('✅ Mensagem pertence ao chat atual. Exibindo...');
            setMensagens((msgs) => [...msgs, novaMensagem]);
          } else {
            console.warn('❌ Mensagem recebida de outro chat, ignorada.');
          }
        }
      )
      .subscribe();

    return () => {
      console.log('🧹 Desconectando canal realtime...');
      supabase.removeChannel(canal);
    };
  }, [chatId]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-third)] text-white rounded-full p-4 shadow-lg"
        >
          <IoChatbubblesOutline size={24} />
        </button>
      )}

      {aberto && (
        <div className="w-80 h-[400px] bg-white shadow-xl rounded-md flex flex-col overflow-hidden border border-gray-300">
          {/* Cabeçalho */}
          <div className="bg-[var(--color-primary)] text-white text-sm font-semibold px-4 py-2 flex justify-between items-center">
            <span>Chat</span>
            <button
              onClick={() => setAberto(false)}
              className="text-white hover:text-gray-300 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Mensagens */}
          <div
            ref={mensagensRef}
            className="flex-1 p-3 overflow-y-auto text-sm text-gray-800"
          >
            {mensagens.length === 0 ? (
              <p className="text-gray-400">Nenhuma mensagem ainda...</p>
            ) : (
              mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 p-2 rounded max-w-[80%] ${
                    msg.autor_id === userId
                      ? 'bg-[var(--color-primary)] text-white ml-auto'
                      : 'bg-gray-100 text-black mr-auto'
                  }`}
                >
                  {msg.texto}
                </div>
              ))
            )}
          </div>

          {/* Campo de envio */}
          <div className="flex border-t px-2 py-2 bg-gray-50">
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && userId && chatId && enviarMensagem()}
              placeholder={
                userId && chatId ? 'Digite sua mensagem...' : 'Carregando...'
              }
              disabled={!userId || !chatId}
              className="flex-1 text-sm p-2 border border-gray-300 rounded disabled:bg-gray-100"
            />
            <button
              onClick={enviarMensagem}
              disabled={!userId || !chatId}
              className={`ml-2 px-4 text-sm text-white rounded ${
                !userId || !chatId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--color-primary)] hover:bg-[var(--color-third)]'
              }`}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
