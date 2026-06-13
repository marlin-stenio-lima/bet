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
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 selection:bg-[#15803D]/20 overflow-x-hidden">
      
      {/* Top Bar - Urgência e Oferta */}
      <div className="bg-[#064E3B] text-white text-center py-2.5 px-4 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase">
        ⚠️ ALERTA: Últimas unidades do Lote com <span className="text-[#15803D]">Frete Grátis e Pagamento na Entrega</span>
      </div>

      {/* Hero Section Premium com Produto */}
      <header className="relative pt-12 pb-20 px-4 overflow-hidden border-b border-[#EAE6DF] bg-white">
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#15803D]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-[#064E3B]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Copy Hero */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[#15803D] text-xs font-bold uppercase tracking-widest mb-6 border border-[#15803D]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Fórmula Sublingual de Ação Rápida
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-[#064E3B] mb-6 leading-[1.1] tracking-tight">
              Se você ignorar essa "pontada" hoje, se prepare para a <span className="relative inline-block"><span className="relative z-10 text-amber-700 italic">cadeira de rodas.</span><div className="absolute bottom-2 left-0 w-full h-3 bg-red-600/20 -rotate-1"></div></span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#6B7068] font-light mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              A dor que você sente é um <strong className="text-amber-700">ALARME DE EMERGÊNCIA</strong> do seu corpo. Descubra a fórmula sublingual que age na raiz da inflamação antes que a única saída seja uma cirurgia de R$ 30.000,00.
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-1 mb-4 w-full">
              <a href="#oferta" className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2 bg-[#064E3B] text-white px-8 md:px-12 py-5 rounded-full font-medium overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_-10px_rgba(15,23,42,0.5)] shadow-lg">
                <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-[15px] font-black text-center">
                  SALVAR MINHA CARTILAGEM AGORA <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B] to-[#065F46] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm text-[#6B7068] font-semibold mt-2 mx-auto md:mx-0 text-center w-full md:w-auto">
                <ShieldCheck className="w-4 h-4 text-green-600" /> Risco Zero: Pague apenas quando o entregador chegar.
              </div>
            </div>
          </div>

          {/* Imagem do Produto */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-[#15803D]/10 blur-[80px] rounded-full scale-75"></div>
            <img src="/alivax-produto.png" alt="ALIVAX em gotas" className="w-full max-w-md mx-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-pulse" style={{ animationDuration: '4s' }} />
              
              {/* Badges Flutuantes */}
              <div className="absolute top-10 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-[#EAE6DF] z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#15803D]/20 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#064E3B]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-[#8B8D88] font-bold uppercase">Absorção</p>
                  <p className="text-sm font-bold text-[#064E3B]">Sublingual Rápida</p>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* Seção Emocional & Fórmula */}
      {/* Seção Emocional (Interesse) */}
      <section className="py-20 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-amber-700 mb-4 animate-pulse">A Verdadeira Causa</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-black text-[#064E3B] max-w-4xl mx-auto leading-tight">
              A indústria farmacêutica quer você <span className="text-[#15803D] underline decoration-orange-200">dependente para sempre.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagem Joelho (Mecanismo de Ação) */}
            <div className="relative transform hover:-translate-y-2 transition-transform duration-500 order-2 md:order-1">
              <div className="absolute inset-0 bg-[#15803D] translate-x-3 translate-y-3 rounded-3xl opacity-20"></div>
              <img src="/alivax-joelho.png" alt="Reconstrução Articular" className="w-full max-w-sm mx-auto relative z-10 rounded-3xl shadow-2xl border-4 border-[#064E3B]" />
              <div className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-[#EAE6DF]">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
                <div>
                  <p className="text-[#064E3B] font-bold text-sm">Osso raspando no osso</p>
                  <p className="text-[#8B8D88] text-xs">O atrito silencioso que te corrói por dentro</p>
                </div>
              </div>
            </div>

            {/* Texto Emocional */}
            <div className="space-y-8 order-1 md:order-2">
              <div className="prose md:prose-lg text-[#6B7068] text-lg font-light leading-relaxed">
                <p className="mb-4">
                  Cada vez que você engole um analgésico de farmácia, sua cartilagem <strong className="text-amber-700">derrete e apodrece um pouco mais</strong>. Eles só mascaram a dor por algumas horas, enquanto o desgaste destruidor continua acontecendo silenciosamente.
                </p>
                <p className="mb-4">
                  Hoje é apenas um inchaço no joelho. Mas se você não parar esse desgaste nas próximas semanas, <strong className="text-[#064E3B] font-bold">você vai perder a capacidade de andar sozinho.</strong> Você quer mesmo depender da sua família para tomar banho ou ir ao banheiro?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Desejo (Solução e Prova Social) */}
      <section className="py-20 md:py-24 bg-white border-t border-[#EAE6DF]">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#15803D] mb-4">A Única Saída</h2>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#064E3B]">
              Milhares de pessoas já <span className="font-bold">escaparam da faca.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-[#FDFBF7] group hover:border-[#15803D] transition-colors">
              <video src="/alivax-depoimento-1.mp4" controls className="w-full h-full object-cover"></video>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-[#FDFBF7] group hover:border-[#15803D] transition-colors">
              <video src="/alivax-depoimento-2.mp4" controls className="w-full h-full object-cover"></video>
            </div>
          </div>

          {/* A Formula */}
          <div className="bg-[#FDFBF7] p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#EAE6DF] max-w-4xl mx-auto mt-16">
            <div className="text-center mb-10">
              <h4 className="font-serif text-3xl text-[#064E3B]">A Revolução Sublingual 🌿</h4>
              <p className="text-[#6B7068] mt-4 font-light text-lg">A única fórmula aprovada capaz de agir de dentro para fora, diretamente na raiz da inflamação:</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#15803D] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#064E3B] mb-1 text-lg">Colágeno Tipo 2 Puro</h5>
                  <p className="text-[#4A4C48] text-sm leading-relaxed">O único ativo capaz de reconstruir a cartilagem desgastada, preenchendo as falhas e <strong className="text-black">parando o atrito "osso com osso".</strong></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#15803D] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#064E3B] mb-1 text-lg">Curcumina Concentrada</h5>
                  <p className="text-[#4A4C48] text-sm leading-relaxed">O anti-inflamatório natural mais potente do mundo. <strong className="text-black">Desincha os joelhos e devolve a flexibilidade</strong> nos primeiros dias de uso.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta de Urgência (Adicional) */}
      <section className="py-16 bg-white border-t border-[#EAE6DF]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl md:text-5xl font-black text-amber-700 mb-6">Você tem pouco tempo.</h3>
          <p className="text-[#064E3B] text-xl md:text-2xl leading-relaxed font-medium">
            Seu corpo já não tem mais 20 anos. <strong className="text-amber-700 underline">A cada semana que você espera, mais cartilagem é destruída para sempre.</strong> Não deixe que a teimosia tire a sua liberdade de andar. O Alivax é a sua última chance de evitar a maca cirúrgica.
          </p>
        </div>
      </section>

      {/* Benefícios Rápidos */}
      <section className="py-20 bg-[#FDFBF7] border-y border-[#EAE6DF]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center group">
            <Droplets className="w-12 h-12 text-[#15803D] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-[#064E3B] mb-3 uppercase tracking-wider text-base md:text-lg">Ação Rápida</h3>
            <p className="text-[#4A4C48] text-sm md:text-base font-medium">Gotas com absorção 10x mais rápida. Direto na corrente sanguínea.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Shield className="w-12 h-12 text-[#15803D] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-[#064E3B] mb-3 uppercase tracking-wider text-base md:text-lg">Sem Colaterais</h3>
            <p className="text-[#4A4C48] text-sm md:text-base font-medium">100% natural. Não ataca o seu estômago e nem o seu fígado.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Leaf className="w-12 h-12 text-[#15803D] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-[#064E3B] mb-3 uppercase tracking-wider text-base md:text-lg">Reconstrução</h3>
            <p className="text-[#4A4C48] text-sm md:text-base font-medium">Não apenas tira a dor, mas estimula o osso a criar nova cartilagem.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <Sparkles className="w-12 h-12 text-[#15803D] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-[#064E3B] mb-3 uppercase tracking-wider text-base md:text-lg">Zero Açúcares</h3>
            <p className="text-[#4A4C48] text-sm md:text-base font-medium">Fórmula testada e segura para diabéticos e hipertensos.</p>
          </div>
        </div>
      </section>

      {/* Oferta / Checkout Logzz */}
      <section id="oferta" className="py-20 md:py-28 px-4 relative bg-white">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#15803D]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4 text-[#064E3B] tracking-tight">O Fim das Dores Chegou</h2>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-red-100 mb-4 animate-pulse">
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
                  <h3 className="font-serif text-3xl text-[#064E3B] mb-1">1 Frasco</h3>
                  <p className="text-[#8B8D88] text-[10px] font-bold uppercase tracking-[0.2em]">Tratamento Inicial</p>
                </div>
                <div className="text-center mb-6 bg-[#FDFBF7] py-4 rounded-2xl border border-[#EAE6DF]/50">
                  <span className="block text-[#A9ACA6] text-xs line-through mb-1 font-light">De R$ 197,00</span>
                  <div className="font-serif text-5xl text-[#064E3B] tracking-tight">R$ 129<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-3 mb-8 pt-4 flex-1">
                  <li className="flex items-center gap-3 text-[15px] text-[#4A4C48] bg-[#FDFBF7] p-3 rounded-xl border border-[#EAE6DF]/80"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span><strong className="text-[#064E3B]">Alívio</strong> nas primeiras semanas</span></li>
                  <li className="flex items-center gap-3 text-[15px] text-[#4A4C48] bg-[#FDFBF7] p-3 rounded-xl border border-[#EAE6DF]/80"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span>Rende <strong className="text-[#064E3B]">1 Mês</strong> de uso</span></li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link1Unidade} onClick={() => handleInitiateCheckout('1 Unidade Alivax', 129.90)} className="w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#c24102] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[15px] transition-all shadow-md group">
                    Pedir 1 Frasco <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7068] font-bold mt-3 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> Pague apenas na entrega
                  </div>
                </div>
              </div>
            </div>

            {/* Kit 2 Unidades */}
            <div className="w-full lg:w-[380px] bg-white rounded-[2rem] border-2 border-[#15803D] shadow-[0_15px_40px_rgb(21,128,61,0.2)] transform lg:-translate-y-4 transition-all duration-500 overflow-hidden flex flex-col group relative z-10">
              <div className="absolute top-0 left-0 right-0 bg-[#15803D] text-white text-center py-2.5 font-black text-[10px] uppercase tracking-[0.2em] z-30">
                ⭐ Oferta Especial: Compre 1, Leve 2
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col relative z-20">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-4xl text-[#064E3B] mb-1">2 Frascos</h3>
                  <p className="text-[#15803D] text-[10px] font-bold uppercase tracking-[0.2em]">Ideal para 2 Meses</p>
                </div>
                <div className="text-center mb-6 relative">
                  <span className="block text-[#A9ACA6] text-sm line-through mb-1 font-light">De R$ 259,80</span>
                  <div className="font-serif text-6xl text-[#064E3B] tracking-tight">R$ 189<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-3 mb-8 pt-2 flex-1">
                  <li className="flex items-center gap-3 text-[15px] text-[#4A4C48] bg-[#15803D]/5 p-3 rounded-xl border border-[#15803D]/20"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span className="font-bold text-[#064E3B]">Tratamento recomendado</span></li>
                  <li className="flex items-center gap-3 text-[15px] text-[#4A4C48] bg-[#15803D]/5 p-3 rounded-xl border border-[#15803D]/20"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span><strong className="text-[#064E3B]">Desinflamação</strong> profunda</span></li>
                  <li className="flex items-center gap-3 text-[15px] text-[#4A4C48] bg-[#15803D]/5 p-3 rounded-xl border border-[#15803D]/20"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span>Devolve a <strong className="text-[#064E3B]">flexibilidade</strong></span></li>
                  <li className="flex items-center gap-3 text-[15px] bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800"><div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">!</div> <span className="font-black">Frete Grátis</span> para sua região</li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link2Unidades} onClick={() => handleInitiateCheckout('2 Unidades Alivax', 189.90)} className="w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[16px] transition-all hover:scale-[1.02] shadow-[0_15px_30px_rgba(21,128,61,0.3)] relative overflow-hidden group/btn">
                    <span className="flex items-center gap-2 relative z-10">Levar 2 Frascos <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" /></span>
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7068] font-bold mt-3 text-center">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Pague apenas na entrega
                  </div>
                </div>
              </div>
            </div>

            {/* Kit 3 Unidades */}
            <div className="w-full lg:w-[340px] bg-[#064E3B] rounded-[2rem] border border-[#065F46] shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.4)] transition-all duration-500 overflow-hidden flex flex-col group relative">
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-3xl text-white mb-1">3 Frascos</h3>
                  <p className="text-[#15803D] text-[10px] font-bold uppercase tracking-[0.2em]">Tratamento Completo</p>
                </div>
                <div className="text-center mb-6 bg-[#065F46]/30 py-4 rounded-2xl border border-[#065F46]">
                  <span className="block text-white/50 text-xs line-through mb-1 font-light">De R$ 389,70</span>
                  <div className="font-serif text-5xl text-white tracking-tight">R$ 289<span className="text-2xl">,90</span></div>
                </div>
                <ul className="space-y-3 mb-8 pt-4 flex-1">
                  <li className="flex items-center gap-3 text-[15px] text-white/90 bg-[#065F46]/60 p-3 rounded-xl border border-[#065F46]"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span><strong className="text-white">Reconstrução total</strong> da cartilagem</span></li>
                  <li className="flex items-center gap-3 text-[15px] text-white/90 bg-[#065F46]/60 p-3 rounded-xl border border-[#065F46]"><CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" /> <span>Manutenção <strong className="text-white">a longo prazo</strong></span></li>
                  <li className="flex items-center gap-3 text-[15px] bg-amber-900/40 p-3 rounded-xl border border-amber-700/50 text-amber-300"><div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">!</div> <span className="font-black">Frete Grátis</span> para sua região</li>
                </ul>
                <div className="w-full flex flex-col items-center">
                  <a href={link3Unidades} onClick={() => handleInitiateCheckout('Kit 3 Unidades Alivax', 289.90)} className="w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white py-5 rounded-2xl font-black tracking-widest uppercase text-[15px] transition-all shadow-[0_15px_30px_rgba(21,128,61,0.2)] group">
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
          <Lock className="w-8 h-8 text-[#064E3B] mx-auto mb-5 opacity-80" />
          <h3 className="text-lg font-serif text-[#064E3B] mb-3">Compra 100% Segura</h3>
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
        <a href="#oferta" className="w-full max-w-lg group relative inline-flex items-center justify-center gap-2 bg-[#15803D] text-white px-6 py-3.5 md:py-4 rounded-full font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_20px_rgba(234,88,12,0.3)]">
          <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-[15px] font-black text-center">
            ACABAR COM AS DORES AGORA
          </span>
        </a>
      </div>
    </div>
  );
}
