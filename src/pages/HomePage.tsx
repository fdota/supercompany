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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const money = parseInt(formData.amount) || 0;
      const hours = parseInt(formData.hours) || 0;
      const hoursValue = hours * 10;
      setCounters({
        totalMoney: money,
        totalHours: hours,
        totalPeople: formData.name ? 1 : 0,
        totalValue: money + hoursValue
      });
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // ✅ ENDPOINT CORRETTO - diretto a Netlify Functions
      const response = await fetch('/.netlify/functions/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        alert('✅ Grazie! La tua adesione è stata registrata con successo.');
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
        
        // Aggiorna i contatori con i dati reali
        const money = parseInt(formData.amount) || 0;
        const hours = parseInt(formData.hours) || 0;
        const hoursValue = hours * 10;
        setCounters(prev => ({
          totalMoney: prev.totalMoney + money,
          totalHours: prev.totalHours + hours,
          totalPeople: prev.totalPeople + 1,
          totalValue: prev.totalValue + money + hoursValue
        }));
      } else {
        const errorMessage = result.error || 'Errore sconosciuto dal server.';
        alert(`⚠️ Si è verificato un errore nel salvataggio. Riprova.\n\nDettagli: ${errorMessage}`);
      }
    } catch (error) {
      alert('⚠️ Si è verificato un errore di rete. Controlla la connessione e riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
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
        <p>Ciao a tutti, mi chiamo Fabio e sto cercando di creare una comunita' di persone che vogliano aprire un'azienda vincente assieme. E' difficile farcela da soli. I soldi e le competenze non bastano mai.</p>
        <p>Per questo ho pensato a questa Super Company, una super azienda che parte dalla coesione per diventare grande. Qui puoi indicare il tuo potenziale contributo, che sia in danaro o in lavoro (se scegli le ore, ti chiederemo anche la tua area di competenza).</p>
        <p>Unire piu' persone insieme per aprire un'azienda e' un'idea che avevo fin da bambino. Se non riusciro' potro' dire di averci almeno provato. Se invece funzionera' sara' la mia piu' grande soddisfazione!</p>
        <p className="text-magenta">Guarda i nostri progressi, e se vuoi, unisciti a noi!</p>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CounterBlock title="Promesse di Investimento" value={formatCurrency(counters.totalMoney)} subtitle={`Da <strong class='text-magenta'>${counters.totalPeople}</strong> persone.`} />
          <CounterBlock title="Valore Ore di Lavoro" value={formatCurrency(counters.totalHours * 10)} subtitle={`Da <strong class='text-magenta'>${counters.totalPeople}</strong> persone.`} />
        </div>
        <CounterBlock title="Totale Promesse" value={formatCurrency(counters.totalValue)} subtitle={`Un impegno preso da <strong class='text-green'>${counters.totalPeople}</strong> persone.`} variant="large" />
      </div>
      <div className="relative z-10">
        <h3 className="font-pixel text-xl text-right-color mb-6">Ora tocca a te.</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
            </div>
          </div>
          <div>
            <Label htmlFor="contributionType">Tipo di contributo</Label>
            <Select name="contributionType" value={formData.contributionType} onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}>
              <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
              <SelectContent><SelectItem value="money">Investimento</SelectItem><SelectItem value="time">Ore</SelectItem><SelectItem value="both">Entrambi</SelectItem></SelectContent>
            </Select>
          </div>
          {(formData.contributionType === "money" || formData.contributionType === "both") && (<div><Label htmlFor="amount">Importo (€)</Label><Input id="amount" name="amount" type="number" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} min="0" /></div>)}
          {(formData.contributionType === "time" || formData.contributionType === "both") && (<><div><Label htmlFor="hours">Ore</Label><Input id="hours" name="hours" type="number" value={formData.hours} onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))} min="0" /></div><div><Label htmlFor="expertise">Competenza</Label><Input id="expertise" name="expertise" value={formData.expertise} onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))} placeholder="es. Marketing..." /></div></>)}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-magenta hover:bg-magenta/90 text-white font-mono border-2 border-magenta hover:border-green transition-colors">
            {isSubmitting ? 'Invio in corso...' : '> Unisciti Ora'}
          </Button>
        </form>
        <div className="mt-12 text-center">
          <h4 className="font-pixel text-md mb-4">Aiutaci a crescere.</h4>
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