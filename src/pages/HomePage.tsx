import SplitLayout from "@/components/layout/SplitLayout";
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counters, setCounters] = useState({ totalMoney: 0, totalHours: 0, totalPeople: 0, totalValue: 0 });

  useEffect(() => {
    const loadExistingData = async () => {
      console.log("Caricamento dati dal Sheet...");
    };
    loadExistingData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('✅ Grazie! La tua adesione è stata registrata con successo.');
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
      } else {
        alert('⚠️ Si è verificato un errore nel salvataggio. Riprova. Errore: ' + result.error);
      }
    } catch (error) {
      alert('⚠️ Si è verificato un errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const leftContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
        <TypewriterText text="Apriamo un'azienda Insieme?" />
      </h1>
      <h2 className="font-pixel text-lg md:text-xl lg:text-2xl text-left-color mb-8 leading-relaxed text-center lg:text-left animate-blink">
        Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
      </h2>
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
        <p>Ciao a tutti, mi chiamo Fabio...</p>
        {/* ... Il resto del tuo testo ... */}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="mb-12">
        {/* ... Il codice dei contatori rimane qui ... */}
      </div>
      
      {/* Aggiungiamo 'relative z-10' per risolvere il problema dei clic */}
      <div className="relative z-10">
        <h3 className="font-pixel text-xl text-right-color mb-6">Ora tocca a te.</h3>
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="bot-field" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-mono text-right-color">Nome</Label>
              <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta" required />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-mono text-right-color">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta" required />
            </div>
          </div>
          <div>
            <Label htmlFor="contributionType" className="text-sm font-mono text-right-color">Tipo di contributo</Label>
            <Select name="contributionType" value={formData.contributionType} onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}>
              <SelectTrigger className="mt-1 border-supercompany-dark-gray"><SelectValue placeholder="Seleziona il tipo di contributo" /></SelectTrigger>
              <SelectContent><SelectItem value="money">Investimento monetario</SelectItem><SelectItem value="time">Ore di lavoro</SelectItem><SelectItem value="both">Entrambi</SelectItem></SelectContent>
            </Select>
          </div>
          {(formData.contributionType === "money" || formData.contributionType === "both") && ( <div><Label htmlFor="amount" className="text-sm font-mono text-right-color">Importo (€)</Label><Input id="amount" name="amount" type="number" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta" min="0" /></div>)}
          {(formData.contributionType === "time" || formData.contributionType === "both") && ( <><div><Label htmlFor="hours" className="text-sm font-mono text-right-color">Ore dedicate al progetto</Label><Input id="hours" name="hours" type="number" value={formData.hours} onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))} className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta" min="0" /></div><div><Label htmlFor="expertise" className="text-sm font-mono text-right-color">Area di competenza</Label><Input id="expertise" name="expertise" value={formData.expertise} onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))} className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta" placeholder="es. Marketing, Sviluppo, Design..." /></div></>)}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-supercompany-magenta hover:bg-supercompany-magenta/90 text-white font-mono">
            {isSubmitting ? 'Invio in corso...' : '> Unisciti Ora'}
          </Button>
        </form>
        <div className="mt-12 text-center">
          <h4 className="font-pixel text-md text-right-color mb-4">Aiutaci a crescere.</h4>
          <div className="flex justify-center space-x-4">
            <a href="https://wa.me/?text=Ehi,%20dai%20un'occhiata%20a%20Supercompany!%20Un%20progetto%20per%20creare%20un'azienda%20tutti%20insieme%20partendo%20da%20zero.%20Il%20sito%20%C3%A8%20supercompany.it" target="_blank" rel="noopener noreferrer" className="text-green hover:text-magenta transition-colors">WHATSAPP</a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://supercompany.it" target="_blank" rel="noopener noreferrer" className="text-green hover:text-magenta transition-colors">LINKEDIN</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://supercompany.it" target="_blank" rel="noopener noreferrer" className="text-green hover:text-magenta transition-colors">FACEBOOK</a>
            <a href="https://twitter.com/intent/tweet?url=https://supercompany.it&text=Ehi,%20scopri%20Supercompany!%20Un%20progetto%20per%20creare%20un'azienda%20tutti%20insieme." target="_blank" rel="noopener noreferrer" className="text-green hover:text-magenta transition-colors">X</a>
          </div>
        </div>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};
export default HomePage;