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

  // Questo useEffect calcola i totali in tempo reale (solo per l'anteprima, non legge ancora i dati reali)
  useEffect(() => {
    const money = parseInt(formData.amount) || 0;
    const hours = parseInt(formData.hours) || 0;
    const hoursValue = hours * 10;
    setCounters({
      totalMoney: money,
      totalHours: hours,
      totalPeople: formData.name ? 1 : 0,
      totalValue: money + hoursValue
    });
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // CORREZIONE FONDAMENTALE: Usiamo l'indirizzo /api/ come definito in netlify.toml
      const response = await fetch('/api/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        alert('✅ Grazie! La tua adesione è stata registrata con successo.');
        // Qui in futuro si potrà ricaricare i dati veri dal foglio
        loadExistingData(); 
        setFormData({ name: "", email: "", contributionType: "", amount: "", hours: "", expertise: "" });
      } else {
        const errorMessage = result.error || 'Si è verificato un errore sconosciuto.';
        alert('⚠️ Errore nel salvataggio: ' + errorMessage);
      }
    } catch (error) {
      console.error('Errore:', error);
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
        <p>Ciao a tutti, mi chiamo Fabio...</p>
        {/* ... (Tutto il tuo testo) ... */}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CounterBlock 
            title="Promesse di Investimento" 
            value={formatCurrency(counters.totalMoney)} 
            subtitle={`Da <strong class='text-magenta'>${counters.totalPeople}</strong> persone.`} 
          />
          <CounterBlock 
            title="Valore Ore di Lavoro" 
            value={formatCurrency(counters.totalHours * 10)} 
            subtitle={`Da <strong class='text-magenta'>${counters.totalPeople}</strong> persone.`} 
          />
        </div>
        <CounterBlock 
          title="Totale Promesse" 
          value={formatCurrency(counters.totalValue)} 
          subtitle={`Un impegno preso da <strong class='text-green'>${counters.totalPeople}</strong> persone.`} 
          variant="large" 
        />
      </div>
      <div className="relative z-10">
        <h3 className="font-pixel text-xl text-right-color mb-6">Ora tocca a te.</h3>
        <form 
          name="join-form" 
          method="POST" 
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="join-form" />
          <div style={{ display: 'none' }}>
            <Label htmlFor="bot-field">Non compilare</Label>
            <Input id="bot-field" name="bot-field" />
          </div>
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
            <Select 
              name="contributionType" 
              value={formData.contributionType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}
            >
              <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="money">Investimento</SelectItem>
                <SelectItem value="time">Ore</SelectItem>
                <SelectItem value="both">Entrambi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(formData.contributionType === "money" || formData.contributionType === "both") && (<div><Label htmlFor="amount">Importo (€)</Label><Input id="amount" name="amount" type="number" value={formData.amount} onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))} min="0" /></div>)}
          {(formData.contributionType === "time" || formData.contributionType === "both") && (<><div><Label htmlFor="hours">Ore</Label><Input id="hours" name="hours" type="number" value={formData.hours} onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))} min="0" /></div><div><Label htmlFor="expertise">Competenza</Label><Input id="expertise" name="expertise" value={formData.expertise} onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))} placeholder="es. Marketing..." /></div></>)}
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-magenta hover:bg-magenta/90 text-white font-mono border-2 border-magenta hover:border-green transition-colors"
          >
            {isSubmitting ? 'Invio in corso...' : '> Unisciti Ora'}
          </Button>
        </form>
        <div className="mt-12 text-center">
          <h4 className="font-pixel text-md mb-4">Aiutaci a crescere.</h4>
          {/* ... Social Links ... */}
        </div>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default HomePage;