import { ShieldCheck, Truck, ArrowRight, CheckCircle2, Sparkles, Leaf, ChevronRight, Droplets, Shield, Heart, HelpCircle, Lock } from 'lucide-react';

export default function AlivaxLP() {
  const queryParams = typeof window !== 'undefined' ? window.location.search : '';
  const link1Unidade = `https://entrega.logzz.com.br/pay/pkvhq-1-alivax${queryParams}`;
  const link2Unidades = `https://entrega.logzz.com.br/pay/kit-compre-1-leve-2${queryParams}`;
  const link3Unidades = `https://entrega.logzz.com.br/pay/qftlh-kit-3-unidades${queryParams}`;

  const handleInitiateCheckout = (productName: string, value: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: productName,
        currency: 'BRL',
        value: value,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 selection:bg-[#EA580C]/20 overflow-x-hidden">
      
      {/* Top Bar - Urgência e Oferta */}
      <div className="bg-[#0F172A] text-white text-center py-2.5 px-4 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase">
        ⚠️ ALERTA: Últimas unidades do Lote com <span className="text-[#EA580C]">Frete Grátis e Pagamento na Entrega</span>
      </div>

      {/* Hero Section Premium com Produto */}
      <header className="relative pt-12 pb-20 px-4 overflow-hidden border-b border-[#EAE6DF] bg-white">
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#EA580C]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-[#0F172A]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Copy Hero */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-6 border border-[#EA580C]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Fórmula Sublingual de Ação Rápida
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-[#0F172A] mb-6 leading-[1.1] tracking-tight">
              Desligue a 'Chave da Dor' nas suas articulações e <span className="relative inline-block"><span className="relative z-10 text-[#EA580C] italic">Volte a se Movimentar</span><div className="absolute bottom-2 left-0 w-full h-3 bg-[#EA580C]/20 -rotate-1"></div></span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#6B7068] font-light mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              O tratamento pioneiro em gotas com <strong className="text-[#0F172A] font-bold">Colágeno Tipo 2 e Curcumina</strong> que age direto na raiz da inflamação. Sem injeções ou remédios fortes.
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-1 mb-4 w-full">
              <a href="#oferta" className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 md:px-12 py-5 rounded-full font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_-10px_rgba(15,23,42,0.5)] shadow-lg">
                <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-[15px] font-black text-center">
                  QUERO ALÍVIO AGORA <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm text-[#6B7068] font-semibold mt-2 mx-auto md:mx-0 text-center w-full md:w-auto">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Risco Zero: Pague apenas quando o entregador chegar.
              </div>
            </div>
          </div>

          {/* Imagem do Produto */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#EA580C]/10 blur-[80px] rounded-full scale-75"></div>
            <img src="/alivax-produto.png" alt="ALIVAX em gotas" className="w-full max-w-md mx-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-pulse" style={{ animationDuration: '4s' }} />
              
              {/* Badges Flutuantes */}
              <div className="absolute top-10 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-[#EAE6DF] z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EA580C]/20 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#0F172A]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-[#8B8D88] font-bold uppercase">Absorção</p>
                  <p className="text-sm font-bold text-[#0F172A]">Sublingual Rápida</p>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* Seção Emocional & Fórmula */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#EA580C] mb-4">A Verdadeira Causa da Dor</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#0F172A] max-w-3xl mx-auto leading-tight">
              Por que você tomou tantos remédios e a dor <span className="italic text-[#EA580C]">sempre volta?</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto Emocional e Ingredientes */}
            <div className="space-y-8">
              <div className="prose md:prose-lg text-[#6B7068] text-lg font-light leading-relaxed">
                <p className="mb-4">
                  Sabemos o quão frustrante é gastar fortunas com anti-inflamatórios fortes que só mascaram a dor e destroem seu estômago. O medo de perder a autonomia para subir uma escada e brincar com os netos é real. E quando o efeito do remédio passa... <strong>a pontada volta ainda pior.</strong>
                </p>
                <p className="text-[#0F172A] font-medium text-[22px] border-l-4 border-[#EA580C] pl-5 italic">
                  As articulações só se curam de verdade quando a cartilagem é restaurada.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE6DF]">
                <h4 className="font-serif text-2xl text-[#0F172A] mb-6">A Revolução do Colágeno Tipo 2 🌿</h4>
                <p className="text-[#6B7068] text-base font-light leading-relaxed mb-6">
                  Nossa fórmula age de dentro para fora para reconstruir e desinflamar:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                    <span className="text-[#4A4C48] text-[16px]"><strong className="text-[#0F172A]">Colágeno Tipo 2:</strong> Protege e reconstrói as cartilagens desgastadas, parando o atrito de osso com osso.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                    <span className="text-[#4A4C48] text-[16px]"><strong className="text-[#0F172A]">Curcumina em Gotas:</strong> O anti-inflamatório natural mais potente. Desincha os joelhos e tira a rigidez.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Imagem Joelho (Mecanismo de Ação) */}
            <div className="relative transform hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-[#EA580C] translate-x-3 translate-y-3 rounded-3xl opacity-20"></div>
              <img src="/alivax-joelho.png" alt="Reconstrução Articular" className="w-full max-w-sm mx-auto relative z-10 rounded-3xl shadow-2xl border-4 border-[#0F172A]" />
              <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-[#EAE6DF]">
                <ShieldCheck className="w-6 h-6 text-[#EA580C]" />
                <div>
                  <p className="text-[#0F172A] font-bold text-sm">Ação Direta na Raiz</p>
                  <p className="text-[#8B8D88] text-xs">Desinflama e restaura a cartilagem</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Reais (Vídeos de Depoimento) */}
      <section className="py-20 md:py-24 bg-white border-t border-[#EAE6DF]">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#EA580C] mb-4">Eficácia Comprovada</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#0F172A]">Veja os Resultados</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-[#FDFBF7] group hover:border-[#EA580C] transition-colors">
              <video src="/alivax-depoimento-1.mp4" controls className="w-full h-full object-cover"></video>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-[#FDFBF7] group hover:border-[#EA580C] transition-colors">
              <video src="/alivax-depoimento-2.mp4" controls className="w-full h-full object-cover"></video>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Rápidos */}
      <section className="py-16 bg-[#FDFBF7] border-y border-[#EAE6DF]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center group">
            <Droplets className="w-10 h-10 text-[#EA580C] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-xs">Ação Rápida</h3>
            <p className="text-[#6B7068] text-xs font-light">Gotas sublinguais com absorção 10x mais rápida que cápsulas comuns.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Shield className="w-10 h-10 text-[#EA580C] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-xs">Sem Colaterais</h3>
            <p className="text-[#6B7068] text-xs font-light">100% natural. Não agride o estômago nem o fígado.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Leaf className="w-10 h-10 text-[#EA580C] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-xs">Reconstrução</h3>
            <p className="text-[#6B7068] text-xs font-light">Não apenas tira a dor, mas ajuda a reconstruir a cartilagem.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Sparkles className="w-10 h-10 text-[#EA580C] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-xs">Zero Açúcares</h3>
            <p className="text-[#6B7068] text-xs font-light">Seguro para diabéticos e hipertensos. Não engorda.</p>
          </div>
        </div>
      </section>

      {/* Oferta / Checkout Logzz */}
      <section id="oferta" className="py-20 md:py-28 px-4 relative bg-white">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#EA580C]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4 text-[#0F172A] tracking-tight">O Fim das Dores Chegou</h2>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-red-100 mb-4 animate-pulse">
              ⚠️ Restam apenas 15 unidades do Lote Atual
            </div>
            <p className="text-[#6B7068] font-light max-w-xl mx-auto text-lg mt-4">
              Escolha seu tratamento. É 100% seguro: <strong>Você só paga quando o entregador deixar o produto nas suas mãos.</strong>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch mt-12">
            
            {/* Kit 1 Unidade */}
            <div className="w-full lg:w-[340px] bg-white rounded-[2rem] border border-[#EAE6DF] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col group relative">
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-3xl text-[#0F172A] mb-1">1 Frasco</h3>
                  <p className="text-[#8B8D88] text-[10px] font-bold uppercase tracking-[0.2em]">Tratamento Inicial</p>
                </div>
                <div className="text-center mb-6 bg-[#FDFBF7] py-4 rounded-2xl border border-[#EAE6DF]/50">
                  <span className="block text-[#A9ACA6] text-xs line-through mb-1 font-light">De R$ 197,00</span>
                  <div className="font-serif text-5xl text-[#0F172A] tracking-tight">R$ 129<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-4 mb-8 pt-4 flex-1">
                  <li className="flex items-start gap-3 text-base text-[#4A4C48] font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span>Alívio nas primeiras semanas</span></li>
                  <li className="flex items-start gap-3 text-base text-[#4A4C48] font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span>Rende 1 Mês de uso</span></li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link1Unidade} onClick={() => handleInitiateCheckout('1 Unidade Alivax', 129.90)} className="w-full flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#c24102] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[15px] transition-all shadow-md group">
                    Pedir 1 Frasco <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7068] font-bold mt-3 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Pague apenas na entrega
                  </div>
                </div>
              </div>
            </div>

            {/* Kit 2 Unidades */}
            <div className="w-full lg:w-[380px] bg-white rounded-[2rem] border-2 border-[#EA580C] shadow-[0_15px_40px_rgb(234,88,12,0.15)] transform lg:-translate-y-4 transition-all duration-500 overflow-hidden flex flex-col group relative z-10">
              <div className="absolute top-0 left-0 right-0 bg-[#EA580C] text-white text-center py-2.5 font-black text-[10px] uppercase tracking-[0.2em] z-30">
                ⭐ Oferta Especial: Compre 1, Leve 2
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col relative z-20">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-4xl text-[#0F172A] mb-1">2 Frascos</h3>
                  <p className="text-[#EA580C] text-[10px] font-bold uppercase tracking-[0.2em]">Ideal para 2 Meses</p>
                </div>
                <div className="text-center mb-6 relative">
                  <span className="block text-[#A9ACA6] text-sm line-through mb-1 font-light">De R$ 259,80</span>
                  <div className="font-serif text-6xl text-[#0F172A] tracking-tight">R$ 189<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-4 mb-8 pt-2 flex-1">
                  <li className="flex items-start gap-3 text-base text-[#4A4C48] font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span><strong>Tratamento recomendado</strong></span></li>
                  <li className="flex items-start gap-3 text-base text-[#4A4C48] font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span>Desinflamação profunda</span></li>
                  <li className="flex items-start gap-3 text-base text-[#4A4C48] font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span>Devolve a flexibilidade</span></li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link2Unidades} onClick={() => handleInitiateCheckout('2 Unidades Alivax', 189.90)} className="w-full flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#c24102] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[16px] transition-all hover:scale-[1.02] shadow-[0_15px_30px_rgba(234,88,12,0.4)] relative overflow-hidden group/btn">
                    <span className="flex items-center gap-2 relative z-10">Levar 2 Frascos <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" /></span>
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7068] font-bold mt-3 text-center">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Pague apenas na entrega
                  </div>
                </div>
              </div>
            </div>

            {/* Kit 3 Unidades */}
            <div className="w-full lg:w-[340px] bg-[#0F172A] rounded-[2rem] border border-[#1E3A8A] shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.4)] transition-all duration-500 overflow-hidden flex flex-col group relative">
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-3xl text-white mb-1">3 Frascos</h3>
                  <p className="text-[#EA580C] text-[10px] font-bold uppercase tracking-[0.2em]">Tratamento Completo</p>
                </div>
                <div className="text-center mb-6 bg-[#1E3A8A]/30 py-4 rounded-2xl border border-[#1E3A8A]">
                  <span className="block text-white/50 text-xs line-through mb-1 font-light">De R$ 389,70</span>
                  <div className="font-serif text-5xl text-white tracking-tight">R$ 289<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-4 mb-8 pt-4 flex-1">
                  <li className="flex items-start gap-3 text-base text-white/90 font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span><strong>Reconstrução total</strong> da cartilagem</span></li>
                  <li className="flex items-start gap-3 text-base text-white/90 font-light"><CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" /> <span>Manutenção a longo prazo</span></li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link3Unidades} onClick={() => handleInitiateCheckout('Kit 3 Unidades Alivax', 289.90)} className="w-full flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#c24102] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[15px] transition-all shadow-md group">
                    Levar 3 Frascos <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-white/60 font-bold mt-3 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Pague apenas na entrega
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Minimalista de Segurança */}
      <footer className="py-12 px-4 text-center bg-white border-t border-[#EAE6DF]">
        <div className="max-w-3xl mx-auto">
          <Lock className="w-8 h-8 text-[#0F172A] mx-auto mb-5 opacity-80" />
          <h3 className="text-lg font-serif text-[#0F172A] mb-3">Compra 100% Segura</h3>
          <p className="text-base text-[#A9ACA6] font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Sua compra é 100% segura com o <strong>Pagamento na Entrega</strong>. Faça o pedido online sem expor dados bancários e pague apenas ao entregador. Risco zero.
          </p>
          <div className="text-[10px] text-[#A9ACA6] uppercase tracking-widest border-t border-[#EAE6DF] pt-8 font-medium">
            © {new Date().getFullYear()} Alivax - Saúde Articular. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Botão Flutuante Fixo na Base */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-[#EAE6DF] p-3 md:p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex justify-center items-center">
        <a href="#oferta" className="w-full max-w-lg group relative inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white px-6 py-3.5 md:py-4 rounded-full font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_20px_rgba(234,88,12,0.3)]">
          <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-[15px] font-black text-center">
            ACABAR COM AS DORES AGORA
          </span>
        </a>
      </div>
    </div>
  );
}
