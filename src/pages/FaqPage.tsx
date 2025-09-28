// src/pages/FaqPage.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- AGGIUNTO

const faqData = [
  {
    question: "Cosa succede ai miei soldi una volta che aderisco?",
    answer: "La cifra che inserisci è solo una manifestazione di interesse non vincolante. Nessun denaro verrà raccolto fino a quando non avremo definito insieme il progetto e le modalità legali.",
  },
  {
    question: "Come verrà scelta l'idea di business?",
    answer: "Tutti i partecipanti verranno invitati su una piattaforma privata (es. Discord) dove le idee verranno presentate, discusse e votate in modo democratico e trasparente.",
  },
  {
    question: "Che ruolo avrò nell'azienda?",
    answer: "Aderendo, diventi un potenziale co-fondatore. Il tuo ruolo dipenderà dal progetto scelto, dalle tue competenze e dal tuo impegno. I dettagli verranno definiti insieme.",
  },
  {
    question: "Come viene valutato l'impegno di tempo?",
    answer: "In questa fase iniziale, usiamo un valore convenzionale di 10 €/ora per quantificare la forza totale del progetto e valorizzare ogni tipo di contributo in modo equo.",
  },
];

const FaqPage = () => {
  const leftContent = (
    <>
      <Navigation /> {/* <-- AGGIUNTO */}
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