import SplitLayout from "@/components/layout/SplitLayout";

const PrivacyPolicy = () => {
  const leftContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
        Privacy Policy
      </h1>
      <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-4 max-w-md mx-auto">
        {/* Incolla qui il contenuto della tua privacy policy */}
        <p><strong>Ultimo aggiornamento:</strong> 28 Settembre 2024</p>
        <p>Questa Privacy Policy descrive come Super Company raccoglie e utilizza i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).</p>
        
        <h2 className="font-pixel text-green mt-6">Titolare del Trattamento</h2>
        <p><strong>Titolare del trattamento:</strong> Fabio</p>
        <p><strong>Email:</strong> fdotautorino@gmail.com</p>
        
        {/* Aggiungi tutto il resto del contenuto... */}
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="font-mono text-sm lg:text-base text-right-color leading-relaxed space-y-4">
        <h2 className="font-pixel text-green">Dati Personali Raccolti</h2>
        <p>Raccogliamo esclusivamente i seguenti dati:</p>
        <ul className="list-disc list-inside">
          <li><strong>Nome</strong> (obbligatorio)</li>
          <li><strong>Indirizzo email</strong> (obbligatorio)</li>
        </ul>
        
        <h2 className="font-pixel text-green">Finalità del Trattamento</h2>
        <p>Utilizziamo i tuoi dati esclusivamente per:</p>
        <ul className="list-disc list-inside">
          <li>Gestire la tua adesione alla community Super Company</li>
          <li>Invio di aggiornamenti sul progetto</li>
          <li>Inviti a partecipare a discussioni ed eventi della community</li>
        </ul>
        
        {/* Continua con il resto del contenuto... */}
      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default PrivacyPolicy;