import { useState } from "react";
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Activity,
  Database, Lock, Globe, Clock, TrendingUp, Eye, Cpu,
  ChevronDown, RefreshCw, Bell, Settings, LogOut, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, RadialBarChart, RadialBar
} from "recharts";

// ── DADOS SIMULADOS ──────────────────────────────────────
const invasoes = [
  { id: 1, hora: "14:32", tipo: "SQL Injection", origem: "185.220.101.47", pais: "🇷🇺 Rússia", alvo: "tabela users", status: "bloqueado", risco: "alto" },
  { id: 2, hora: "13:58", tipo: "Brute Force", origem: "45.142.212.100", pais: "🇨🇳 China", alvo: "porta 3306", status: "bloqueado", risco: "alto" },
  { id: 3, hora: "12:41", tipo: "XSS Attempt", origem: "192.168.0.45", pais: "🇧🇷 Brasil", alvo: "campo search", status: "bloqueado", risco: "médio" },
  { id: 4, hora: "11:20", tipo: "Privilege Escalation", origem: "103.15.250.10", pais: "🇮🇳 Índia", alvo: "usuário root", status: "bloqueado", risco: "crítico" },
  { id: 5, hora: "10:05", tipo: "Data Exfiltration", origem: "80.67.172.162", pais: "🇫🇷 França", alvo: "tabela pedidos", status: "bloqueado", risco: "crítico" },
  { id: 6, hora: "09:33", tipo: "SQL Injection", origem: "91.108.56.22", pais: "🇩🇪 Alemanha", alvo: "tabela produtos", status: "bloqueado", risco: "alto" },
  { id: 7, hora: "08:17", tipo: "Port Scan", origem: "5.188.206.26", pais: "🇳🇱 Holanda", alvo: "múltiplas portas", status: "monitorando", risco: "baixo" },
];

const historicoData = [
  { dia: "Seg", tentativas: 12, bloqueadas: 12 },
  { dia: "Ter", tentativas: 19, bloqueadas: 18 },
  { dia: "Qua", tentativas: 8,  bloqueadas: 8  },
  { dia: "Qui", tentativas: 27, bloqueadas: 26 },
  { dia: "Sex", tentativas: 34, bloqueadas: 34 },
  { dia: "Sáb", tentativas: 15, bloqueadas: 15 },
  { dia: "Dom", tentativas: 7,  bloqueadas: 7  },
];

const tiposAtaque = [
  { tipo: "SQL Injection", count: 38 },
  { tipo: "Brute Force",   count: 27 },
  { tipo: "Port Scan",     count: 19 },
  { tipo: "XSS",           count: 11 },
  { tipo: "Outros",        count: 5  },
];

const parametros = [
  { label: "Banco de dados",       valor: "MySQL 8.0",         icon: Database },
  { label: "Host",                 valor: "db.empresa.com.br", icon: Globe    },
  { label: "Porta monitorada",     valor: "3306",              icon: Lock     },
  { label: "Uptime do agente",     valor: "99.98%",            icon: Activity },
  { label: "Última varredura",     valor: "há 3 minutos",      icon: Clock    },
  { label: "Versão do agente",     valor: "v2.4.1",            icon: Cpu      },
];

const nivelRisco = [{ name: "Risco", value: 22, fill: "#00e5b0" }];

// ── BADGE DE RISCO ────────────────────────────────────────
const RiskBadge = ({ risco }: { risco: string }) => {
  const map: Record<string, string> = {
    crítico: "bg-red-500/20 text-red-400 border-red-500/30",
    alto:    "bg-orange-500/20 text-orange-400 border-orange-500/30",
    médio:   "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    baixo:   "bg-green-500/20 text-green-400 border-green-500/30",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${map[risco]}`}>
      {risco.charAt(0).toUpperCase() + risco.slice(1)}
    </span>
  );
};

// ── MAIN ─────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState<"invasoes"|"parametros"|"ia">("invasoes");

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 md:w-56 bg-gradient-card border-r border-border flex flex-col z-40">
        <div className="flex items-center gap-2 p-4 border-b border-border h-16">
          <Shield className="h-7 w-7 text-primary flex-shrink-0" />
          <span className="hidden md:block text-lg font-display font-bold">DBShield</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {[
            { id: "invasoes",   icon: AlertTriangle, label: "Invasões"   },
            { id: "parametros", icon: Database,      label: "Parâmetros" },
            { id: "ia",         icon: Cpu,           label: "Como a IA funciona" },
          ].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id as any)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                ${tab === id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="hidden md:block">{label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all w-full text-left">
            <Bell className="h-4 w-4 flex-shrink-0" />
            <span className="hidden md:block">Alertas</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all w-full text-left">
            <Settings className="h-4 w-4 flex-shrink-0" />
            <span className="hidden md:block">Configurações</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all w-full text-left">
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span className="hidden md:block">Sair</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="ml-16 md:ml-56 min-h-screen">

        {/* TOPBAR */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <div>
            <h1 className="font-display font-bold text-foreground">
              {tab === "invasoes" ? "Monitoramento de Segurança" : tab === "parametros" ? "Parâmetros do Banco" : "Como a IA Funciona"}
            </h1>
            <p className="text-xs text-muted-foreground">Empresa: Grupo Exemplo S.A. · Plano Pro</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Monitorando ao vivo
            </span>
            <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="p-6">

          {/* ── ABA: INVASÕES ── */}
          {tab === "invasoes" && (
            <div className="flex flex-col gap-6">

              {/* Cards de resumo */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: AlertTriangle, label: "Tentativas hoje",   valor: "7",     cor: "text-orange-400", bg: "bg-orange-500/10" },
                  { icon: XCircle,       label: "Bloqueadas",         valor: "6",     cor: "text-red-400",    bg: "bg-red-500/10"    },
                  { icon: CheckCircle,   label: "Taxa de bloqueio",   valor: "98,5%", cor: "text-accent",     bg: "bg-accent/10"     },
                  { icon: Eye,           label: "Em monitoramento",   valor: "1",     cor: "text-primary",    bg: "bg-primary/10"    },
                ].map(({ icon: Icon, label, valor, cor, bg }) => (
                  <div key={label} className="bg-gradient-card border border-border rounded-2xl p-5 flex flex-col gap-3">
                    <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${cor}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold">{valor}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráficos */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold mb-4">Tentativas por dia</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={historicoData}>
                      <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 12, fontSize: 13 }} />
                      <Bar dataKey="tentativas" fill="#f97316" radius={[6,6,0,0]} name="Tentativas" />
                      <Bar dataKey="bloqueadas" fill="#00e5b0" radius={[6,6,0,0]} name="Bloqueadas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gradient-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold mb-4">Tipos de ataque</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={tiposAtaque} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="tipo" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} width={90} />
                      <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 12, fontSize: 13 }} />
                      <Bar dataKey="count" fill="#00c8ff" radius={[0,6,6,0]} name="Ataques" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabela de invasões */}
              <div className="bg-gradient-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Registro de tentativas de invasão</h2>
                  <span className="text-xs text-muted-foreground">{invasoes.length} registros hoje</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground text-xs">
                        <th className="text-left px-6 py-3 font-medium">Horário</th>
                        <th className="text-left px-6 py-3 font-medium">Tipo de ataque</th>
                        <th className="text-left px-6 py-3 font-medium">IP de origem</th>
                        <th className="text-left px-6 py-3 font-medium">País</th>
                        <th className="text-left px-6 py-3 font-medium">Parte atacada</th>
                        <th className="text-left px-6 py-3 font-medium">Risco</th>
                        <th className="text-left px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invasoes.map((inv) => (
                        <tr key={inv.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                          <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{inv.hora}</td>
                          <td className="px-6 py-4 font-medium text-foreground">{inv.tipo}</td>
                          <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{inv.origem}</td>
                          <td className="px-6 py-4">{inv.pais}</td>
                          <td className="px-6 py-4 text-muted-foreground"><code className="bg-secondary px-2 py-0.5 rounded text-xs">{inv.alvo}</code></td>
                          <td className="px-6 py-4"><RiskBadge risco={inv.risco} /></td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-1.5 text-xs font-medium ${inv.status === "bloqueado" ? "text-accent" : "text-yellow-400"}`}>
                              {inv.status === "bloqueado" ? <CheckCircle className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                              {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── ABA: PARÂMETROS ── */}
          {tab === "parametros" && (
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-3 gap-4">
                {parametros.map(({ label, valor, icon: Icon }) => (
                  <div key={label} className="bg-gradient-card border border-border rounded-2xl p-6 flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-foreground">{valor}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nível de risco geral */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold mb-2">Nível de risco atual</h2>
                  <p className="text-sm text-muted-foreground mb-4">Calculado com base nas últimas 24h de atividade</p>
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width={140} height={140}>
                      <RadialBarChart innerRadius={40} outerRadius={65} data={nivelRisco} startAngle={90} endAngle={-270}>
                        <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "hsl(220 15% 18%)" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div>
                      <p className="text-4xl font-display font-bold text-accent">22%</p>
                      <p className="text-accent font-medium">Risco Baixo</p>
                      <p className="text-xs text-muted-foreground mt-1">Nenhuma vulnerabilidade crítica detectada</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold mb-4">Status de proteção</h2>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Firewall de banco de dados",     ok: true  },
                      { label: "Criptografia em repouso",        ok: true  },
                      { label: "Criptografia em trânsito (TLS)", ok: true  },
                      { label: "Backup automático",              ok: true  },
                      { label: "Autenticação em 2 fatores",      ok: false },
                      { label: "Patches de segurança",           ok: true  },
                    ].map(({ label, ok }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className={`flex items-center gap-1 text-xs font-medium ${ok ? "text-accent" : "text-orange-400"}`}>
                          {ok ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                          {ok ? "Ativo" : "Atenção"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Público-alvo */}
              <div className="bg-gradient-card border border-border rounded-2xl p-6">
                <h2 className="font-semibold mb-1">Público-alvo do DBShield</h2>
                <p className="text-sm text-muted-foreground mb-5">Empresas e perfis que mais se beneficiam da plataforma</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "🏦", titulo: "Fintechs e bancos", desc: "Alta sensibilidade de dados financeiros e exigência regulatória (LGPD, PCI-DSS)." },
                    { icon: "🏥", titulo: "Saúde e hospitais", desc: "Proteção de prontuários e dados de pacientes contra vazamentos e ransomware." },
                    { icon: "🛒", titulo: "E-commerce", desc: "Segurança de dados de clientes, cartões e histórico de pedidos em ambientes de alto tráfego." },
                    { icon: "🏢", titulo: "Empresas B2B", desc: "Gestão centralizada de múltiplos bancos de dados com relatórios de conformidade." },
                  ].map(({ icon, titulo, desc }) => (
                    <div key={titulo} className="bg-secondary/40 rounded-xl p-4">
                      <p className="text-2xl mb-2">{icon}</p>
                      <p className="font-semibold text-sm mb-1">{titulo}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ABA: COMO A IA FUNCIONA ── */}
          {tab === "ia" && (
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold">Motor de IA do DBShield</h2>
                    <p className="text-sm text-muted-foreground">Como a inteligência artificial detecta e bloqueia ameaças</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  O DBShield utiliza um modelo de IA treinado com milhões de padrões de ataques reais a bancos de dados. 
                  O agente instalado no servidor coleta continuamente os logs de acesso e os envia para análise, 
                  identificando comportamentos anômalos em tempo real — sem nunca expor o conteúdo dos dados.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { step: "01", icon: Activity, titulo: "Coleta de logs", desc: "O agente leve instalado no servidor monitora todas as queries, conexões e acessos ao banco de dados em tempo real, sem impacto de performance." },
                  { step: "02", icon: Cpu, titulo: "Análise por IA", desc: "Um modelo de machine learning analisa os padrões de acesso e compara com uma base de assinaturas de ataques conhecidos (SQL Injection, Brute Force, etc.)." },
                  { step: "03", icon: Shield, titulo: "Bloqueio automático", desc: "Ao detectar uma ameaça, a IA aciona o firewall do banco de dados instantaneamente, bloqueia o IP de origem e gera um alerta detalhado no dashboard." },
                ].map(({ step, icon: Icon, titulo, desc }) => (
                  <div key={step} className="bg-gradient-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-display font-bold text-primary/30">{step}</span>
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-card border border-border rounded-2xl p-6">
                <h2 className="font-semibold mb-5">Tipos de ameaças que a IA detecta</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { tipo: "SQL Injection", desc: "Queries maliciosas que tentam manipular o banco de dados via campos de entrada.", icone: "💉" },
                    { tipo: "Brute Force", desc: "Tentativas repetidas de login com diferentes senhas para ganhar acesso.", icone: "🔑" },
                    { tipo: "Privilege Escalation", desc: "Tentativas de um usuário comum obter permissões de administrador.", icone: "⬆️" },
                    { tipo: "Data Exfiltration", desc: "Extração não autorizada de grandes volumes de dados do banco.", icone: "📤" },
                    { tipo: "Ransomware", desc: "Malware que criptografa os dados e exige resgate para liberar.", icone: "🔒" },
                    { tipo: "Zero-day Exploits", desc: "Ataques que exploram vulnerabilidades ainda desconhecidas pelo fabricante.", icone: "⚡" },
                  ].map(({ tipo, desc, icone }) => (
                    <div key={tipo} className="bg-secondary/40 rounded-xl p-4">
                      <p className="text-xl mb-2">{icone}</p>
                      <p className="font-semibold text-sm mb-1">{tipo}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
