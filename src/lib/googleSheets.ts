import { invitationConfig } from '@/config/invitation.config';

export interface GuestData {
  nombre: string;
  creado_en?: string;
}

export async function submitToGoogleSheets(
  data: GuestData
) {
  const webhookUrl = invitationConfig.rsvp?.webhookUrl;
  
  if (!webhookUrl) {
    console.warn('Google Sheets Webhook URL not configured.');
    return;
  }

  const payload: any = {
    type: 'guest',
    creado_en: data.creado_en || new Date().toISOString(),
    nombre: data.nombre,
  };

  try {
    const params = new URLSearchParams(payload).toString();
    const urlWithParams = `${webhookUrl}?${params}`;
    

    await fetch(urlWithParams, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
    });

    return { success: true };
  } catch (error) {
    console.error(`Error submitting to Google Sheets:`, error);
    return { success: false, error };
  }
}
