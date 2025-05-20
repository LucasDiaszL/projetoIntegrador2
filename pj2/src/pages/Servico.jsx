import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchDiv from "../components/SearchDiv";
import Footer from "../components/Footer";

const mockServicos = [
  { id: 1, nome: "Corte de Cabelo", companhia: "Studio Hair", localizacao: "São Paulo", tipo: "Presencial", experiencia: "1-3 anos", salario: "$50/h", descricao: "Corte masculino e feminino, técnicas modernas." },
  { id: 2, nome: "Manicure", companhia: "Beleza Express", localizacao: "Rio de Janeiro", tipo: "Remoto", experiencia: "5+ anos", salario: "$30/h", descricao: "Manicure profissional com foco em unhas artísticas." },
  { id: 3, nome: "Consultoria de Negócios", companhia: "BizConsult", localizacao: "Belo Horizonte", tipo: "Remoto", experiencia: "5+ anos", salario: "$100/h", descricao: "Planejamento estratégico e gestão empresarial." },
  { id: 4, nome: "Aula de Inglês", companhia: "English4U", localizacao: "Curitiba", tipo: "Remoto", experiencia: "3-5 anos", salario: "$80/h", descricao: "Inglês conversacional e técnico para adultos." },
  { id: 5, nome: "Serviço de Limpeza", companhia: "CleanPro", localizacao: "Salvador", tipo: "Presencial", experiencia: "1-3 anos", salario: "$25/h", descricao: "Limpeza residencial e comercial." }
];

const Servico = () => {
  const [buscaServico, setBuscaServico] = useState("");
  const [buscaCompanhia, setBuscaCompanhia] = useState("");
  const [buscaLocalizacao, setBuscaLocalizacao] = useState("");
  const [selectedServico, setSelectedServico] = useState(null);

  const servicosFiltrados = mockServicos.filter(servico =>
    servico.nome.toLowerCase().includes(buscaServico.toLowerCase()) &&
    servico.companhia.toLowerCase().includes(buscaCompanhia.toLowerCase()) &&
    servico.localizacao.toLowerCase().includes(buscaLocalizacao.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-8">
        <SearchDiv
          valueServico={buscaServico}
          onChangeServico={(e) => setBuscaServico(e.target.value)}
          onClearServico={() => setBuscaServico("")}
          valueCompanhia={buscaCompanhia}
          onChangeCompanhia={(e) => setBuscaCompanhia(e.target.value)}
          onClearCompanhia={() => setBuscaCompanhia("")}
          valueLocalizacao={buscaLocalizacao}
          onChangeLocalizacao={(e) => setBuscaLocalizacao(e.target.value)}
          onClearLocalizacao={() => setBuscaLocalizacao("")}
        />

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Sidebar Filtros */}
          <aside className="col-span-3 bg-white p-6 rounded-2xl shadow-sm border text-sm space-y-6">
            <div>
              <h3 className="text-base font-semibold mb-2">Sort By</h3>
              <div className="space-y-2">
                <div><input type="radio" name="sort" /> Most Recent</div>
                <div><input type="radio" name="sort" /> Top Salary</div>
                <div><input type="radio" name="sort" /> A-Z</div>
                <div><input type="radio" name="sort" /> Trending</div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Salary</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Min" className="border p-1 w-full rounded-md" />
                <input type="text" placeholder="Max" className="border p-1 w-full rounded-md" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Job Type</h3>
              <div className="space-y-2">
                <div><input type="checkbox" /> Full-time</div>
                <div><input type="checkbox" /> Remote</div>
                <div><input type="checkbox" /> Part-time</div>
                <div><input type="checkbox" /> Volunteer</div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Experience</h3>
              <div className="space-y-2">
                <div><input type="checkbox" /> 1-3 years</div>
                <div><input type="checkbox" /> 3-5 years</div>
                <div><input type="checkbox" /> 5+ years</div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">Location</h3>
              <div className="space-y-2">
                <div><input type="checkbox" /> Remote</div>
                <div><input type="checkbox" /> On-site</div>
                <div><input type="checkbox" /> Hybrid</div>
              </div>
            </div>
          </aside>

          {/* Lista de Resultados */}
          <main className="col-span-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              <p className="text-sm text-gray-500">{servicosFiltrados.length} Resultados</p>
            </div>
            <div className="grid gap-4">
              {servicosFiltrados.map(servico => (
                <div
                  key={servico.id}
                  onClick={() => setSelectedServico(servico)}
                  className={`border rounded-xl p-4 bg-white cursor-pointer hover:shadow-md transition ${selectedServico?.id === servico.id ? 'border-blue-500' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{servico.nome}</h3>
                      <p className="text-sm text-gray-600">{servico.companhia} - {servico.localizacao}</p>
                      <div className="text-xs text-gray-500 mt-2 flex gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded-md">{servico.tipo}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">{servico.experiencia}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">{servico.salario}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">5min ago</span>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Detalhes do Serviço */}
          <aside className="col-span-3 bg-white p-6 rounded-2xl shadow-sm border text-sm">
            {selectedServico ? (
              <>
                <h3 className="text-xl font-bold mb-2">{selectedServico.nome}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedServico.companhia} - {selectedServico.localizacao}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{selectedServico.tipo}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{selectedServico.experiencia}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{selectedServico.salario}</span>
                </div>
                <p className="text-sm mb-4">{selectedServico.descricao}</p>
                <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-neutral-500 text-sm">Candidatar-se</button>
              </>
            ) : (
              <p className="text-gray-400">Selecione um serviço para ver detalhes</p>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Servico;
