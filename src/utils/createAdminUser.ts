import { supabase } from "@/integrations/supabase/client";

export const createAdminUser = async (email: string, password: string) => {
  try {
    const response = await fetch('https://iwgtwzpygoyohocbgqgm.supabase.co/functions/v1/create-admin-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Z3R3enB5Z295b2hvY2JncWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NTM4OTksImV4cCI6MjA2NzEyOTg5OX0.qAe2WDhB0K3r71mKwAFBXL9_gc2sPn8XwgM6mAS9iyI`
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create admin user');
    }

    return data;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};