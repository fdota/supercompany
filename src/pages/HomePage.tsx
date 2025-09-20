import SplitLayout from "@/components/layout/SplitLayout";
import CounterBlock from "@/components/ui/counter-block";
import TypewriterText from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contributionType: "",
    amount: "",
    hours: "",
    expertise: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const leftContent = (
    <div className="flex flex-col justify-center h-full">
      <h1 className="font-pixel text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed">
        <TypewriterText text="Apriamo un'azienda insieme?" />
      </h1>
      
      <h2 className="font-pixel text-xl lg:text-2xl text-left-color mb-8 leading-relaxed">
        Se da solo non riesci, <span className="text-green italic">insieme</span> si può.
      </h2>
      
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto text-center italic">
        <p>
          Ciao a tutti, mi chiamo Fabio e sto cercando di creare una comunita' di persone 
          che vogliano aprire un'azienda vincente assieme. E' difficile farcela da soli. 
          I soldi e le competenze non bastano mai.
        </p>
        
        <p>
          Per questo ho pensato a questa Super Company, una super azienda che parte dalla 
          coesione per diventare grande. Qui puoi indicare il tuo potenziale contributo, 
          che sia in danaro o in lavoro (se scegli le ore, ti chiederemo anche la tua area 
          di competenza).
        </p>
        
        <p>
          Unire piu' persone insieme per aprire un'azienda e' un'idea che avevo fin da bambino. 
          Se non riusciro' potro' dire di averci almeno provato. Se invece funzionera' sara' 
          la mia piu' grande soddisfazione!
        </p>
        
        <p className="text-magenta">
          Guarda i nostri progressi, e se vuoi, unisciti a noi!
        </p>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full">
      {/* Contatori */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CounterBlock
            title="Promesse di Investimento"
            value="€ 0"
            subtitle="Da <strong class='text-magenta'>0</strong> persone."
            colorScheme="magenta"
          />
          <CounterBlock
            title="Valore Ore di Lavoro"
            value="€ 0"
            subtitle="Da <strong class='text-magenta'>0</strong> persone."
            colorScheme="magenta"
          />
        </div>
        
        <CounterBlock
          title="Totale Promesse"
          value="€ 0"
          subtitle="Un impegno preso da <strong class='text-green'>0</strong> persone."
          variant="large"
          colorScheme="green"
        />
      </div>

      {/* Form di Adesione */}
      <div>
        <h3 className="font-pixel text-xl text-right-color mb-6">Ora tocca a te.</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-mono text-right-color">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-mono text-right-color">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contribution" className="text-sm font-mono text-right-color">Tipo di contributo</Label>
            <Select 
              value={formData.contributionType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, contributionType: value }))}
            >
              <SelectTrigger className="mt-1 border-supercompany-dark-gray">
                <SelectValue placeholder="Seleziona il tipo di contributo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="money">Investimento monetario</SelectItem>
                <SelectItem value="time">Ore di lavoro</SelectItem>
                <SelectItem value="both">Entrambi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.contributionType === "money" || formData.contributionType === "both") && (
            <div>
              <Label htmlFor="amount" className="text-sm font-mono text-right-color">Importo (€)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta"
                min="0"
              />
            </div>
          )}

          {(formData.contributionType === "time" || formData.contributionType === "both") && (
            <>
              <div>
                <Label htmlFor="hours" className="text-sm font-mono text-right-color">Ore dedicate al progetto</Label>
                <Input
                  id="hours"
                  type="number"
                  value={formData.hours}
                  onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                  className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="expertise" className="text-sm font-mono text-right-color">Area di competenza</Label>
                <Input
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
                  className="mt-1 border-supercompany-dark-gray focus:ring-supercompany-magenta"
                  placeholder="es. Marketing, Sviluppo, Design..."
                />
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full bg-supercompany-magenta hover:bg-supercompany-magenta/90 text-white font-mono border-2 border-supercompany-magenta hover:border-supercompany-green transition-colors"
          >
            {">"} Unisciti Ora
          </Button>
        </form>
        
        {/* Sezione condivisione social */}
        <div className="mt-12 pt-8 border-t border-supercompany-dark-gray">
          <p className="font-mono text-sm text-right-color text-center leading-relaxed">
            Se ti piace il progetto e vuoi condividerlo con persone che pensi possano essere interessate, ecco qui alcuni social.
          </p>
        </div>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default HomePage;