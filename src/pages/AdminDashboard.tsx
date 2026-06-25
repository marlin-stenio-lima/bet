import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const fakeWithdrawals = [
    { id: 1, user: 'joao.silva@email.com', amount: 150.00, status: 'analysis', date: 'Hoje, 14:30' },
    { id: 2, user: 'maria.oliveira@email.com', amount: 220.00, status: 'analysis', date: 'Hoje, 15:45' },
  ];

  return (
    <div className="min-h-screen bg-[#071b0f] text-white font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-black text-[#FFDF00] uppercase tracking-wider">
            Painel do Administrador
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a3017] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Banca Geral</p>
            <p className="text-3xl font-black text-[#02A473]">R$ 1.450,00</p>
          </div>
          <div className="bg-[#0a3017] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Saques Pendentes</p>
            <p className="text-3xl font-black text-white">2</p>
          </div>
          <div className="bg-[#0a3017] p-6 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Lucro do Dia</p>
            <p className="text-3xl font-black text-blue-400">+ R$ 380,00</p>
          </div>
        </div>

        <div className="bg-[#0a3017] rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-yellow-500 w-6 h-6" /> Saques em Análise
            </h2>
            <p className="text-sm text-gray-400 mt-1">Aprove ou rejeite os saques baseado no saldo da banca geral.</p>
          </div>

          <div className="p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-white/10">
                  <th className="p-4 font-bold text-gray-400 text-sm">Usuário</th>
                  <th className="p-4 font-bold text-gray-400 text-sm">Valor</th>
                  <th className="p-4 font-bold text-gray-400 text-sm">Data</th>
                  <th className="p-4 font-bold text-gray-400 text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {fakeWithdrawals.map(w => (
                  <tr key={w.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 font-medium">{w.user}</td>
                    <td className="p-4 font-black text-[#02A473]">R$ {w.amount.toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-400">{w.date}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <button className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-1 text-sm">
                        <XCircle className="w-4 h-4" /> Rejeitar
                      </button>
                      <button className="bg-[#02A473]/20 text-[#02A473] hover:bg-[#02A473] hover:text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-1 text-sm">
                        <CheckCircle className="w-4 h-4" /> Aprovar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
