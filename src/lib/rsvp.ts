import { supabase } from '@/lib/supabase';

/**
 * Envía una confirmación de asistencia a Supabase.
 * Retorna el registro creado o lanza un error descriptivo.
 */
export async function submitRSVP(
  data: { guestName: string; }
): Promise<any> {
  const { error, data: insertedData } = await supabase
    .from('invitados3')
    .insert({
      nombre: data.guestName.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error('[submitRSVP] Supabase error:', error.message);
    throw new Error('No se pudo guardar tu confirmación. Intenta de nuevo.');
  }

  return insertedData;
}
