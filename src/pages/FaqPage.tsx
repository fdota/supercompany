// src/pages/FaqPage.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- Importa Navigation

const faqData = [
  {
    question: "Cosa succede ai miei soldi una volta che aderisco?",
    answer: "La cifra che inserisci è un impegno, non un pagamento. Nessun denaro verrà raccolto fino a quando non avremo definito insieme il progetto d'impresa e le modalità legali per la costituzione della società.",
  },
  {
    question: "Come verrà scelta l'idea di business?",
    answer: "Tutti i partecipanti verranno invitati su una piattaforma privata (es. Discord) dove le idee verranno presentate, discusse e votate. Il processo sarà democratico e trasparente.",
  },
  {
    question: "Che ruolo avrò nell'azienda?",
    answer: "Aderendo, diventi un potenziale co-fondatore. Il tuo ruolo dipenderà dalla natura del progetto scelto e dalle tue competenze, oltre che dal tuo impegno. Tutti i dettagli verranno definiti insieme.",
  },
  {
    question: "Come funziona l'impegno di tempo e come viene valutato?",
    answer: "Crediamo che il tempo e il talento siano preziosi quanto il denaro. Per questo, abbiamo introdotto un valore convenzionale di co-fondazione di 10 €/ora. Questo ci permette di quantificare la forza totale del progetto e di valorizzare ogni tipo di contributo in modo equo in questa fase iniziale.",
  },
];

const FaqPage = () => {
  const leftContent = (
    <>
      <Navigation /> {/* <-- Navigation va qui dentro */}
      <div className="flex flex-col justify-center h-full items-center p-4">
        <h1 className="font-pixel text-4xl text-green">Faq</h1>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="space-y-8 max-w-md mx-auto">
        {faqData.map((item, index) => (
          <div key={index}>
            <h3 className="font-pixel text-lg text-magenta mb-2">{item.question}</h3>
            <p className="font-mono text-base text-right-color">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default FaqPage;