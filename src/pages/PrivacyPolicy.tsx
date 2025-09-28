// src/pages/PrivacyPolicy.tsx

import SplitLayout from "@/components/layout/SplitLayout";
import Navigation from "@/components/layout/Navigation";

const PrivacyPolicy = () => {
  const leftContent = (
    <>
      <Navigation />
      <div className="flex flex-col justify-center h-full p-4">
        <h1 className="font-pixel text-sm md:text-3xl lg:text-4xl text-magenta mb-8 leading-relaxed text-center lg:text-right">
          🔒 Privacy Policy
        </h1>

        <div className="font-mono text-sm lg:text-base text-left-color leading-relaxed space-y-6 max-w-md mx-auto">
          <div className="bg-white/5 p-4 rounded border border-gray-700">
            <p><strong>Ultimo aggiornamento:</strong> 28 Settembre 2025</p>
            <p className="mt-2">Questa Privacy Policy descrive come Super Company raccoglie e utilizza i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).</p>
          </div>

          <h2 className="font-pixel text-green text-lg pt-4">📋 TITOLARE DEL TRATTAMENTO</h2>
          <div className="bg-white/5 p-4 rounded border border-gray-700">
            <p><strong className="text-magenta">Titolare:</strong> Fabio</p>
            <p><strong className="text-magenta">Email:</strong> fdotautorino@gmail.com</p>
          </div>

          <h2 className="font-pixel text-green text-lg pt-4">📊 DATI PERSONALI RACCOLTI</h2>
          <div className="bg-white/5 p-4 rounded border border-gray-700">
            <p>Raccogliamo esclusivamente i dati che fornisci volontariamente:</p>
            <ul className="list-disc list-inside mt-2 pl-4">
              <li>Nome (obbligatorio)</li>
              <li>Indirizzo email (obbligatorio)</li>
            </ul>
             <p className="mt-2"><strong>Non raccogliamo:</strong> numeri di telefono, indirizzi fisici, o altre informazioni sensibili.</p>
          </div>

          <h2 className="font-pixel text-green text-lg pt-4">🎯 FINALITÀ DEL TRATTAMENTO</h2>
          <div className="bg-white/5 p-4 rounded border border-gray-700">
            <p>Utilizziamo i tuoi dati esclusivamente per:</p>
            <ul className="list-disc list-inside mt-2 pl-4">
                <li>Gestire la tua adesione alla community Super Company.</li>
                <li>Inviarti aggiornamenti sul progetto.</li>
                <li>Invitarti a discussioni ed eventi della community.</li>
                <li>Comunicazioni relative allo sviluppo del progetto.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  const rightContent = (
    <div className="flex flex-col justify-center h-full p-4">
      <div className="font-mono text-sm lg:text-base text-right-color leading-relaxed space-y-6 max-w-md mx-auto">
        
        <h2 className="font-pixel text-green text-lg">⚖️ BASE GIURIDICA</h2>
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
          <p>Il trattamento si basa sul tuo <strong className="text-magenta">consenso esplicito</strong>, fornito compilando il form. Puoi revocare il consenso in qualsiasi momento.</p>
        </div>

        <h2 className="font-pixel text-green text-lg pt-4">💾 CONSERVAZIONE E SICUREZZA</h2>
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
          <p>I dati sono conservati su <strong className="text-magenta">Google Sheets/Drive</strong>. Implementiamo misure di sicurezza come:</p>
          <ul className="list-disc list-inside mt-2 pl-4">
            <li>Accesso limitato al solo titolare.</li>
            <li>Account Google protetto con autenticazione forte.</li>
            <li>Nessuna condivisione pubblica del documento.</li>
          </ul>
        </div>
        
        <h2 className="font-pixel text-green text-lg pt-4">⏱️ DURATA CONSERVAZIONE</h2>
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
            <p>I dati sono conservati fino a:</p>
            <ul className="list-disc list-inside mt-2 pl-4">
              <li>Tua richiesta di cancellazione.</li>
              <li>Abbandono del progetto.</li>
              <li>Massimo <strong className="text-magenta">2 anni di inattività</strong>.</li>
            </ul>
        </div>

        <h2 className="font-pixel text-green text-lg pt-4">🎪 I TUOI DIRITTI (GDPR)</h2>
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
            <p>Hai diritto di <strong className="text-magenta">Accesso, Modifica, Cancellazione, Portabilità, Revoca del consenso</strong> e <strong className="text-magenta">Limitazione del trattamento</strong> dei tuoi dati.</p>
             <p className="mt-4">Per esercitare i tuoi diritti, contattaci a: <strong className="text-magenta">fdotautorino@gmail.com</strong>. Risponderemo entro 30 giorni.</p>
        </div>

      </div>
    </div>
  );

  return <SplitLayout leftContent={leftContent} rightContent={rightContent} />;
};

export default PrivacyPolicy;