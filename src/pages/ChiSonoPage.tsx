// src/pages/ChiSonoPage.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation"; // <-- AGGIUNTO

const ChiSonoPage = () => {
  const leftContent = (
    <>
      <Navigation /> {/* <-- AGGIUNTO */}
      <div className="flex flex-col justify-center h-full p-4">
        <h1 className="font-pixel text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
          Chi sono
        </h1>
        
        <div className="flex justify-center">
          <div className="w-64 h-64 bg-supercompany-white/10 border-2 border-supercompany-magenta rounded-lg flex items-center justify-center">
            <span className="text-supercompany-magenta font-mono text-sm">
              [foto_fabio.jpg]
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="font-mono text-sm lg:text-base text-right-color leading-relaxed space-y-6 max-w-md mx-auto">
        <p>
          <strong>Piacere, Fabio!</strong> Sono nato a Milano quasi 40 anni fa (questione di 
          mesi ormai) e ho fatto praticamente tutti i lavori possibili e immaginabili.
        </p>
        <p>
          Mi sono appena ritrasferito in Italia dopo un'esperienza di quasi 3 anni a 
          Copenhagen dove ho lavorato nella ristorazione...
        </p>
        <p>
          So usare programmi di grafica per foto, montare video, ho fatto corsi di 
          marketing, per aprire start up...
        </p>
        <p>
          Mi piacerebbe aprire un'azienda con altre persone perche' riconosco quanto 
          sia difficile farlo da soli.
        </p>
        <p>
          Per un semplice bar ci vogliono centinaia di migliaia di euro... È tutto molto complesso.
        </p>
        <p>
          È vero, se hai una buona idea puoi provare ad entrare in un incubatore, 
          ma io volevo fare una cosa molto diversa. <strong>
          Creare da zero una Comunita' e far decidere a questa cosa fare!</strong>
        </p>
        <p>
          Non sono qui per creare un Unicorno... ma dare vita a qualcosa che prima non c'era...
        </p>
        <p className="text-supercompany-magenta">
          Non ho figli e non so se ne avrò, ma mi piacerebbe poter dire che sono stato 
          il "La" di qualcosa molto più grande di me.
        </p>
        <p className="font-bold text-supercompany-green">
          Buon viaggio a chi salirà a bordo!
        </p>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default ChiSonoPage;