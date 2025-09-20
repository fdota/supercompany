import SplitLayout from "@/components/layout/SplitLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
  const leftContent = (
    <div className="flex flex-col justify-center h-full">
      <h1 className="font-pixel text-3xl lg:text-4xl text-green mb-8 leading-relaxed">
        Faq
      </h1>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full">
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="border-supercompany-dark-gray">
          <AccordionTrigger className="font-mono text-right-color hover:text-supercompany-magenta transition-colors">
            Cosa succede ai miei soldi una volta che aderisco?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-sm text-right-color leading-relaxed">
            La cifra che inserisci è un <strong className="text-supercompany-magenta">impegno</strong>, 
            non un pagamento. Nessun denaro verrà raccolto fino a quando non avremo definito insieme 
            il progetto d'impresa e le modalità legali per la costituzione della società.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-supercompany-dark-gray">
          <AccordionTrigger className="font-mono text-right-color hover:text-supercompany-magenta transition-colors">
            Come verrà scelta l'idea di business?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-sm text-right-color leading-relaxed">
            Tutti i partecipanti verranno invitati su una <strong className="text-supercompany-green">
            piattaforma privata</strong> (es. Discord) dove le idee verranno presentate, discusse e votate. 
            Il processo sarà democratico e trasparente.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-supercompany-dark-gray">
          <AccordionTrigger className="font-mono text-right-color hover:text-supercompany-magenta transition-colors">
            Che ruolo avrò nell'azienda?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-sm text-right-color leading-relaxed">
            Aderendo, diventi un potenziale <strong className="text-supercompany-magenta">co-fondatore</strong>. 
            Il tuo ruolo dipenderà dalla natura del progetto scelto e dalle tue competenze, oltre che dal 
            tuo impegno. Tutti i dettagli verranno definiti insieme.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-supercompany-dark-gray">
          <AccordionTrigger className="font-mono text-right-color hover:text-supercompany-magenta transition-colors">
            Come funziona l'impegno di tempo e come viene valutato?
          </AccordionTrigger>
          <AccordionContent className="font-mono text-sm text-right-color leading-relaxed">
            Crediamo che il tempo e il talento siano preziosi quanto il denaro. Per questo, abbiamo 
            introdotto un valore convenzionale di co-fondazione di <strong className="text-supercompany-green">
            10 €/ora</strong>. Questo ci permette di quantificare la forza totale del progetto e di 
            valorizzare ogni tipo di contributo in modo equo in questa fase iniziale.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default Faq;