import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAdventState = () => {
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    const fetchState = async () => {
      try {
        setLoading(true);
        // Try to fetch from Supabase
        // We assume a single row with ID 1 for simplicity for a single-user app
        const { data, error } = await supabase
          .from('advent_progress')
          .select('opened_days')
          .eq('id', 1)
          .single();

        if (error) {
          // If table doesn't exist or connection fails, we might be in "no supabase" mode
          // or first run.
          console.warn('Supabase fetch error (ignore if not set up):', error.message);
          // Fallback to localStorage if Supabase fails? 
          // The user specifically asked for cross-device, so we should rely on Supabase.
          // But for dev experience, let's check localStorage too if Supabase fails.
          const local = localStorage.getItem('advent_opened_days');
          if (local) {
            setOpenedDays(JSON.parse(local));
          }
        } else if (data) {
          setOpenedDays(data.opened_days || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, []);

  const markDayOpened = async (day: number) => {
    if (openedDays.includes(day)) return;

    const newOpened = [...openedDays, day];
    setOpenedDays(newOpened);
    
    // Save to LocalStorage as backup
    localStorage.setItem('advent_opened_days', JSON.stringify(newOpened));

    // Save to Supabase
    try {
      // Upsert: try to update row 1, or insert if not exists
      const { error } = await supabase
        .from('advent_progress')
        .upsert({ id: 1, opened_days: newOpened });

      if (error) {
        console.error('Supabase save error:', error.message);
      }
    } catch (err) {
      console.error('Supabase save exception:', err);
    }
  };

  return { openedDays, markDayOpened, loading };
};
