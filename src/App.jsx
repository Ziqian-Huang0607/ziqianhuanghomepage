import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GITHUB_USERNAME = "Ziqian-Huang0607";

// --- STABLE SVG ICONS ---
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>;
const IconGithub = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;

const decodeGH = (s) => {
    try { return decodeURIComponent(escape(window.atob(s.replace(/\s/g, '')))); } 
    catch(e) { return "Documentation unavailable."; }
};

// --- REPOSITORY DETAIL VIEW ---
const RepoDetail = () => {
  const { repoName } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/github?repo=${repoName}`).then(res => res.json()).then(setData);
  }, [repoName]);

  if (!data) return <div className="h-screen bg-black flex items-center justify-center font-mono text-blue-500 italic uppercase tracking-widest">Accessing_Data_Block...</div>;

  return (
    <div className="min-h-screen bg-black text-zinc-400">
      <nav className="border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur-xl z-50 py-4 px-8 flex justify-between items-center">
        <Link to="/" className="text-white font-black italic uppercase tracking-tighter hover:text-blue-500 transition-all">← Back to Index</Link>
        <span className="text-[10px] font-mono text-zinc-600 uppercase">Archive // {repoName}</span>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-10 break-words underline decoration-blue-500/20">{repoName}</h1>
        <article className="prose prose-invert max-w-none bg-zinc-900/30 p-8 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{decodeGH(data.readme?.content)}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

// --- HOMEPAGE BENTO GLOSSARY ---
const Home = () => {
  const [data, setData] = useState({ user: {}, repos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github').then(res => res.json()).then(d => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-blue-600 font-mono italic animate-pulse">ESTABLISHING_LINK...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24">
      {/* SECTION 1: IDENTITY */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-8">
          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter italic uppercase">
            Ziqian <br/> Huang
          </h1>
          <div className="space-y-4 max-w-2xl">
            <p className="text-2xl text-blue-500 font-bold italic tracking-tight">Hey there nice to meet you! 👋</p>
            <p className="text-lg text-zinc-400 leading-relaxed font-medium">
              My name is <span className="text-white">Gordon. H</span>. I'm a Hobby Developer and dream to become a Development Expert.
            </p>
            <p className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em] leading-loose">
              FullStack Developer / Software Developer / Machine Learning Architect / Python Developer / Go Developer / Swift UI / HTML / SQL / JavaScript Dev / Cybersecurity Red Team
            </p>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <img src={data.user.avatar_url} className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 object-cover" alt="Profile" />
        </div>
      </header>

      {/* SECTION 2: BIO & SOCIALS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] space-y-6">
          <h2 className="text-white font-black uppercase text-xs tracking-widest italic">Affiliations</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Staff & Core Dev at <span className="text-blue-400 underline underline-offset-4">Codehubbers</span>, Founder <span className="text-blue-400 underline underline-offset-4">Apex Mac Workshop</span>, Cofounder <span className="text-blue-400 underline underline-offset-4">SHSID ML Club</span>, Core member of Official IT team for <span className="text-blue-400 underline underline-offset-4">SHSID</span> and Indexademics of SHSID.
          </p>
          <div className="pt-6 border-t border-white/5 flex gap-10">
             <div><p className="text-[10px] text-zinc-600 font-bold uppercase mb-1">Languages</p><p className="text-sm text-zinc-300">Chinese, English, Cantonese</p></div>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-[3rem] flex flex-col justify-between">
           <div className="space-y-4">
             <h2 className="text-white font-black uppercase text-xs tracking-widest italic">🌐 Socials</h2>
             <a href="mailto:mlfusion@outlook.com" className="text-2xl md:text-3xl font-black text-blue-500 hover:text-white transition-colors truncate block">mlfusion@outlook.com</a>
           </div>
           <div className="mt-10">
             <p className="text-xs italic text-zinc-500 font-medium">"All our dreams can come true, if we have the courage to pursue them."</p>
             <p className="text-[10px] font-black text-white uppercase mt-2">— Walt Disney</p>
           </div>
        </div>
      </section>

      {/* SECTION 3: GITHUB STATS */}
      <section className="space-y-8">
        <h2 className="text-center text-[10px] font-black text-zinc-700 uppercase tracking-[1em]">Dynamic System Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img className="w-full bg-zinc-900/50 rounded-3xl p-6 border border-white/5" src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&theme=dark&hide_border=true&bg_color=00000000`} alt="Stats" />
          <img className="w-full bg-zinc-900/50 rounded-3xl p-6 border border-white/5" src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&theme=dark&hide_border=true&bg_color=00000000&layout=compact`} alt="Langs" />
          <img className="w-full bg-zinc-900/50 rounded-3xl p-6 border border-white/5" src={`https://github-profile-trophy.vercel.app/?username=${GITHUB_USERNAME}&theme=radical&no-frame=true&no-bg=true&margin-w=4`} alt="Trophies" />
        </div>
      </section>

      {/* SECTION 4: CERTIFICATIONS */}
      <section className="space-y-10">
        <h2 className="text-white font-black uppercase text-xs tracking-widest italic">Verified Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { n: "SQL HackerRank Advanced", l: "https://www.hackerrank.com/certificates/ad02ccc01634" },
            { n: "Python HackerRank Basic", l: "https://www.hackerrank.com/certificates/d53d647f61af" },
            { n: "TestDome Go Top 10%", l: "https://www.testdome.com/certificates/d2b907e0d0f244c28eafcdc3e519ff98" },
            { n: "TestDome Python Top 10%", l: "https://www.testdome.com/certificates/7beaa38ee4fc42f2b5dea79da8223df8" },
            { n: "TestDome Swift Top 10%", l: "https://www.testdome.com/certificates/3a52a5cd52a34f8789e8bdef73deee93" },
            { n: "TestDome Linux Admin Top 10%", l: "https://www.testdome.com/certificates/9afedc8c12cc4cf3a1d52f25a186b3b0" },
            { n: "TestDome Cybersecurity Top 10%", l: "https://www.testdome.com/certificates/85c688f6e8f54fc9b19058fb1629c2e2" },
            { n: "TestDome HR Top 25%", l: "https://www.testdome.com/certificates/32e5f65e04694f91a1475ae7dcd7ab31" },
            { n: "DataWhale Prompt Engineer", l: "#" },
            { n: "Datawhale LLM Dev Engineer", l: "#" },
            { n: "LLM Certificate (HAAI)", l: "#" }
          ].map(c => (
            <a key={c.n} href={c.l} target="_blank" className="flex justify-between items-center bg-zinc-900/30 border border-white/5 p-5 rounded-2xl group hover:border-blue-500/50 transition-all">
              <span className="text-xs font-bold text-zinc-300">{c.n}</span>
              <IconArrow />
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 5: TECH STACK */}
      <section className="space-y-10">
        <h2 className="text-white font-black uppercase text-xs tracking-widest italic">💻 Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "go-%2300ADD8", "html5-%23E34F26", "markdown-%23000000", "swift-F54A2A", "AlibabaCloud-%23FF6701", 
            "Oracle-F80000", "Anaconda-%2344A833", "cuda-000000", "Qt-%23217346", "mysql-4479A1", "sqlite-%2307405e",
            "numpy-%23013243", "pandas-%23150458", "PyTorch-%23EE4C2C", "TensorFlow-%23FF6F00", "docker-%230db7ed", "python-3670A0"
          ].map(t => (
            <img key={t} src={`https://img.shields.io/badge/${t}.svg?style=for-the-badge&logo=${t.split('-')[0]}&logoColor=white`} className="h-8" />
          ))}
        </div>
      </section>

      {/* SECTION 6: GLOSSARY */}
      <section className="space-y-12 pb-40">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Repository Glossary</h2>
          <div className="h-px bg-white/5 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
          {data.repos.map(repo => (
            <Link key={repo.id} to={`/repo/${repo.name}`} className="p-12 bg-black hover:bg-blue-600 transition-all duration-700 group">
               <h3 className="text-3xl font-black text-white italic group-hover:translate-x-2 transition-transform mb-4">{repo.name}</h3>
               <p className="text-zinc-500 group-hover:text-white/80 text-sm line-clamp-2 mb-8">{repo.description || "Experimental engineering data."}</p>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-white">
                 <span>{repo.language || "Binary"}</span>
                 <IconGithub />
               </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:repoName" element={<RepoDetail />} />
      </Routes>
    </Router>
  );
}