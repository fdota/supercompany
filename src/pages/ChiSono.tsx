import SplitLayout from "@/components/layout/SplitLayout";

const ChiSono = () => {
  const leftContent = (
    <div className="flex flex-col justify-center h-full">
      <h1 className="font-pixel text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed">
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
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full">
      <div className="font-mono text-sm lg:text-base text-right-color leading-relaxed space-y-6">
        <p>
          <strong>Piacere, Fabio!</strong> Sono nato a Milano quasi 40 anni fa (questione di 
          mesi ormai) e ho fatto praticamente tutti i lavori possibili e immaginabili.
        </p>
        
        <p>
          Mi sono appena ritrasferito in Italia dopo un'esperienza di quasi 3 anni a 
          Copenhagen dove ho lavorato nella ristorazione. In Italia ho lavorato nei 
          traslochi, come cassiere, promoter, come data entry, come magazziniere, nel 
          controllo documentale, come barista, barback, cameriere, nella vendita al 
          dettaglio, nella vendita all'ingrosso, e con buona probabilita' un'altra 
          decina di lavori non mi sovviene.
        </p>
        
        <p>
          So usare programmi di grafica per foto, montare video, ho fatto corsi di 
          marketing, per aprire start up, corsi per gestire una campagna adv e di 
          intelligenza artificiale.
        </p>
        
        <p>
          Mi piacerebbe aprire un'azienda con altre persone perche' riconosco quanto 
          sia difficile farlo da soli.
        </p>
        
        <p>
          Per un semplice bar ci vogliono centinaia di migliaia di euro. Per fare 
          un applicazione per smartphone almeno 15 mila euro. Per fare pubblicita' 
          sui vari motori di ricerca o per strada, altre migliaia di euro al mese. 
          E' tutto molto complesso.
        </p>
        
        <p>
          E' vero, se hai una buona idea puoi provare ad entrare in un incubatore, 
          farti finanziare, ma io volevo fare una cosa molto diversa. <strong>
          Creare da zero una Comunita' e far decidere a questa cosa fare!</strong>
        </p>
        
        <p>
          Non sono qui per creare un Unicorno (un'azienda che vale 1 miliardo di dollari), 
          sarebbe sciocco anche solo pensarci, ma dare vita a qualcosa che prima non c'era, 
          o migliorare un qualcosa di esistente, dargli un nome e vedere questa cosa 
          crescere, respirare, vivere e interagire.
        </p>
        
        <p className="text-supercompany-magenta">
          Non ho figli e non so se ne avro', ma mi piacerebbe poter dire che sono stato 
          il "La" di qualcosa molto piu' grande di me.
        </p>
        
        <p className="font-bold text-supercompany-green">
          Buon viaggio a chi salira' a bordo!
        </p>
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default ChiSono;