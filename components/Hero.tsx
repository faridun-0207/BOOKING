
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Sparkline: React.FC<{ color?: string }> = ({ color = '#6366f1' }) => {
  // Нуқтаҳои сохта барои визуализатсияи тамоюл
  const points = [5, 8, 4, 10, 7, 12, 9, 15];
  const width = 40;
  const height = 12;
  const max = Math.max(...points);
  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / max) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block ml-3 opacity-60 overflow-visible">
      <path 
        d={pathData} 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx={width} cy={height - (points[points.length - 1] / max) * height} r="1.5" fill={color} />
    </svg>
  );
};

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
      {/* Background with dynamic gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Bookshelf" 
          className="w-full h-full object-cover opacity-15 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-600/25 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 animate-fade-up">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-indigo-300 text-[11px] font-black uppercase tracking-[0.25em] mb-12 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Беҳтарин асарҳои тоҷикӣ инҷост
          </div>
          
          <h1 className="text-6xl md:text-9xl font-extrabold text-white mb-10 leading-[0.95] tracking-tight font-heading">
            Олами донишро <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200">
              кашф намоед
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed max-w-2xl font-light tajik-text">
            Аз классикони бузург то нависандагони муосир. Мо китобро то дари хонаи шумо мерасонем — зуд, босифат ва бо муҳаббати бепоён.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onExplore}
              className="px-14 py-6 btn-gradient text-white font-black rounded-[2rem] hover:-translate-y-1 active:scale-95 transition-all text-xl shadow-2xl shadow-indigo-600/30"
            >
              Феҳристро дидан
            </button>
            <button className="px-14 py-6 bg-white/5 text-white font-bold rounded-[2rem] hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all text-xl">
              Оиди лоиҳа
            </button>
          </div>

          {/* Stats */}
          <div className="mt-24 flex flex-wrap gap-16 border-t border-white/5 pt-14">
            <div className="animate-fade-up [animation-delay:200ms]">
              <div className="flex items-center">
                <div className="text-5xl font-black text-white font-heading">5000+</div>
                <Sparkline color="#818cf8" />
              </div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Мизоҷон</div>
            </div>
            <div className="animate-fade-up [animation-delay:400ms]">
              <div className="flex items-center">
                <div className="text-5xl font-black text-white font-heading">1200+</div>
                <Sparkline color="#c084fc" />
              </div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Китобҳо</div>
            </div>
            <div className="animate-fade-up [animation-delay:600ms]">
              <div className="flex items-center">
                <div className="text-5xl font-black text-white font-heading">24/7</div>
                <Sparkline color="#6366f1" />
              </div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Хидматрасонӣ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
