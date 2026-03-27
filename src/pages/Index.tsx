import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Database, Lock, ChevronRight, Menu, X, ChevronDown, Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [["features","Recursos"],["testimonials","Depoimentos"],["pricing","Planos"],["faq","FAQ"],["contact","Contato"]];
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-xl font-display font-bold text-foreground">DBShield</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-foreground transition-colors">{label}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Entrar</Button>
          <Button size="sm" onClick={() => scrollTo("contact")}>Agendar Demo</Button>
        </div>
        <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden">
            <div className="container py-4 flex flex-col gap-1">
              {links.map(([id, label]) => (
                <button key={id} onClick={() => { scrollTo(id); setMobileOpen(false); }}
                  className="py-3 px-2 text-left text-muted-foreground hover:text-foreground transition-colors border-b border-border/30 last:border-0">
                  {label}
                </button>
              ))}
              <div className="flex gap-3 pt-3">
                <Button variant="ghost" size="sm" className="flex-1">Entrar</Button>
                <Button size="sm" className="flex-1" onClick={() => { scrollTo("contact"); setMobileOpen(false); }}>Agendar Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Proteção de banco de dados" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-background/50" />
    </div>
    <div className="container relative z-10 py-20">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
          <Lock className="h-3.5 w-3.5" />
          Segurança de nível empresarial
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
          Proteja seus{" "}<span className="text-gradient-primary">bancos de dados</span>{" "}com inteligência
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Monitoramento contínuo, alertas em tempo real e proteção avançada para os dados mais críticos da sua empresa. Tudo em uma única plataforma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="hero" onClick={() => scrollTo("contact")}>Começar agora <ChevronRight className="ml-1 h-5 w-5" /></Button>
          <Button variant="hero-outline" onClick={() => scrollTo("contact")}>Agendar demonstração</Button>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-12 text-muted-foreground text-sm">
          {["+500 empresas protegidas","99.9% uptime","SOC 2 Compliant"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />{t}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const features = [
  { icon: Shield, title: "Proteção em Tempo Real", description: "Monitoramento 24/7 com detecção automática de ameaças e vulnerabilidades nos seus bancos de dados." },
  { icon: Database, title: "Multi-Database", description: "Suporte para PostgreSQL, MySQL, MongoDB, SQL Server e muito mais em uma única plataforma." },
  { icon: Lock, title: "Criptografia Avançada", description: "Criptografia AES-256 em repouso e em trânsito, garantindo máxima segurança dos seus dados." },
];

const Features = () => (
  <section id="features" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Segurança completa para seus <span className="text-gradient-primary">dados</span></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Uma plataforma robusta que monitora, protege e gerencia a segurança dos bancos de dados da sua empresa.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group bg-gradient-card border border-border rounded-2xl p-8 transition-all duration-500 border-glow-hover hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-primary transition-all duration-500">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  { name: "Carlos Mendonça", role: "CTO, FinTech Brasil", avatar: "CM", stars: 5, text: "O DBShield nos ajudou a detectar uma tentativa de SQL injection antes que causasse qualquer dano. A equipe de segurança ficou impressionada com a velocidade dos alertas." },
  { name: "Aline Ferreira", role: "Head de TI, Grupo Saúde+", avatar: "AF", stars: 5, text: "Implementamos o DBShield em menos de um dia. A integração com nosso MySQL foi perfeita e os relatórios de conformidade LGPD salvaram horas da nossa equipe." },
  { name: "Rafael Torres", role: "DevOps Lead, E-Commerce Max", avatar: "RT", stars: 5, text: "Gerenciar a segurança de 12 bancos de dados diferentes era um pesadelo. Com o DBShield, temos visibilidade total em um único painel. Recomendo fortemente." },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-gradient-card border-y border-border">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Empresas que <span className="text-gradient-primary">confiam</span> no DBShield</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Veja o que nossos clientes dizem sobre a proteção dos seus dados.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-gradient-card border border-border rounded-2xl p-8 flex flex-col gap-4 border-glow-hover transition-all duration-500">
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, s) => <Star key={s} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <p className="text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{t.avatar}</div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  { name: "Starter", price: "R$99", period: "/mês", features: ["Monitoramento básico","1 banco de dados","Alertas por e-mail","Dashboard básico"], popular: false },
  { name: "Pro", price: "R$299", period: "/mês", features: ["Análise completa","Alertas automáticos","5 bancos de dados","Relatórios mensais","Suporte prioritário"], popular: true },
  { name: "Enterprise", price: "R$999", period: "/mês", features: ["Múltiplos bancos","Relatórios avançados","Bancos ilimitados","API dedicada","SLA 99.99%","Gerente de conta"], popular: false },
];

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Planos que se adaptam ao seu <span className="text-gradient-primary">negócio</span></h2>
        <p className="text-muted-foreground text-lg">Escolha o plano ideal para a segurança da sua empresa.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative bg-gradient-card border rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${plan.popular ? "border-primary/50 glow-primary scale-105" : "border-border border-glow-hover"}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">MAIS POPULAR</div>
            )}
            <h3 className="text-xl font-display font-semibold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />{f}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? "default" : "outline"} className="w-full" size="lg" onClick={() => scrollTo("contact")}>Começar agora</Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const faqs = [
  { question: "O DBShield funciona com qualquer banco de dados?", answer: "Sim! O DBShield suporta os principais bancos de dados do mercado: PostgreSQL, MySQL, MariaDB, MongoDB, SQL Server, Oracle e Redis. A integração é feita via agente leve instalado no servidor." },
  { question: "Quanto tempo leva para configurar?", answer: "A maioria dos clientes está operacional em menos de 30 minutos. Nosso agente de monitoramento se instala com um único comando e começa a coletar dados imediatamente." },
  { question: "Meus dados passam pelos servidores do DBShield?", answer: "Não. O DBShield monitora apenas metadados de acesso e padrões de consulta — nunca o conteúdo dos seus dados. Todo o processamento de alertas é feito localmente e apenas métricas agregadas são enviadas à nossa plataforma." },
  { question: "O DBShield ajuda com conformidade LGPD?", answer: "Sim. O DBShield gera relatórios automáticos de acesso a dados pessoais, detecta acessos não autorizados e mantém logs de auditoria completos, facilitando a demonstração de conformidade com a LGPD." },
  { question: "Posso cancelar a qualquer momento?", answer: "Sim, sem fidelidade ou multas. Você pode cancelar a assinatura a qualquer momento pelo painel, e o acesso continua até o fim do período pago." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 bg-gradient-card border-y border-border">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Perguntas <span className="text-gradient-primary">frequentes</span></h2>
          <p className="text-muted-foreground text-lg">Tire suas dúvidas sobre o DBShield.</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border border-border rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left bg-gradient-card hover:bg-secondary/30 transition-colors">
                <span className="font-semibold text-foreground">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

type FormState = "idle" | "sending" | "sent";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };
  return (
    <section id="contact" className="py-24">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Pronto para proteger seus <span className="text-gradient-primary">dados</span>?</h2>
          <p className="text-muted-foreground text-lg">Agende uma demonstração gratuita ou mande sua mensagem — respondemos em até 24h.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gradient-card border border-border rounded-3xl p-8 md:p-10">
          {status === "sent" ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle className="h-16 w-16 text-primary" />
              <h3 className="text-2xl font-display font-bold">Mensagem enviada!</h3>
              <p className="text-muted-foreground">Nossa equipe entrará em contato em breve.</p>
              <Button variant="outline" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", message: "" }); }}>Enviar outra mensagem</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[["name","Nome *","Seu nome","text"],["email","E-mail *","seu@email.com","email"]].map(([name, label, ph, type]) => (
                  <div key={name} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground">{label}</label>
                    <input name={name} type={type} value={form[name as keyof typeof form]} onChange={handleChange} placeholder={ph}
                      className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Empresa</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Nome da empresa (opcional)"
                  className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Mensagem *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Conte como podemos ajudar..." rows={5}
                  className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" />
              </div>
              <Button onClick={handleSubmit} disabled={status === "sending" || !form.name || !form.email || !form.message} className="w-full" size="lg">
                {status === "sending" ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />Enviando...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send className="h-4 w-4" />Enviar mensagem</span>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-display font-bold">DBShield</span>
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Privacidade</button>
          <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Termos</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">Contato</button>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 DBShield. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Features />
    <Testimonials />
    <Pricing />
    <FAQ />
    <Contact />
    <Footer />
  </div>
);

export default Index;
