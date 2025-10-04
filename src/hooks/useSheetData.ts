import { useState, useEffect } from 'react';

interface SheetCounters {
  totalMoney: number;
  totalHours: number;
  totalPeople: number;
  totalValueOre: number;
  totalValue: number;
}

export const useSheetData = (): {
  counters: SheetCounters;
  loading: boolean;
  refreshData: () => Promise<void>;
} => {
  const [counters, setCounters] = useState<SheetCounters>({
    totalMoney: 0,
    totalHours: 0,
    totalPeople: 0,
    totalValueOre: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  const refreshData = async (): Promise<void> => {
    try {
      console.log('🔄 Caricamento dati dal server...');
      const response = await fetch('/.netlify/functions/load-from-sheet');
      
      if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Dati caricati:', result.totali);
        const sheetCounters = {
          totalMoney: result.totali.investimenti || 0,
          totalHours: result.totali.oreLavoro || 0,
          totalPeople: result.totali.persone || 0,
          totalValueOre: result.totali.valoreOre || 0,
          totalValue: result.totali.totaleComplessivo || 0
        };
        
        setCounters(sheetCounters);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('supercompany-counters', JSON.stringify(sheetCounters));
        }
      } else {
        throw new Error(result.error || 'Errore nel caricamento dati');
      }
    } catch (error) {
      console.error('❌ Errore caricamento dati sheet:', error);
      
      if (typeof window !== 'undefined') {
        const savedData = localStorage.getItem('supercompany-counters');
        if (savedData) {
          console.log('📦 Usando dati localStorage come fallback');
          setCounters(JSON.parse(savedData));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { counters, loading, refreshData };
};