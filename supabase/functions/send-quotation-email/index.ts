import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting email sending process");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const supabase = createClient(supabaseUrl!, supabaseKey!);
    const { quotationId } = await req.json();
    
    console.log("Fetching quotation data for ID:", quotationId);

    const { data: quotation, error: fetchError } = await supabase
      .from("quotations")
      .select("*")
      .eq("id", quotationId)
      .single();

    if (fetchError || !quotation) {
      console.error("Error fetching quotation:", fetchError);
      throw new Error("Failed to fetch quotation data");
    }

    console.log("Quotation data fetched successfully:", quotation);

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(quotation.quoted_price);

    const formatDate = (date: string | null) => {
      if (!date) return "Não especificado";
      try {
        return new Date(date).toLocaleDateString("pt-BR");
      } catch (e) {
        console.error("Error formatting date:", e);
        return "Data inválida";
      }
    };

    const emailHtml = `
      <h2>Nova Cotação Recebida</h2>
      <p><strong>Nome:</strong> ${quotation.full_name}</p>
      <p><strong>Email:</strong> ${quotation.email}</p>
      <p><strong>Telefone:</strong> ${quotation.phone}</p>
      <p><strong>Número de pessoas:</strong> ${quotation.num_people}</p>
      <p><strong>Número de quartos:</strong> ${quotation.num_bedrooms}</p>
      <p><strong>Configuração das camas:</strong> ${quotation.bed_config === "separate" ? "Separadas" : "Compartilhadas"}</p>
      <p><strong>Localização:</strong> ${quotation.location === "urban" ? "Área urbana" : "Área rural"}</p>
      <p><strong>Quintal:</strong> ${
        quotation.has_yard === "none" ? "Sem quintal" :
        quotation.has_yard === "small" ? "Quintal pequeno" : "Quintal grande"
      }</p>
      <p><strong>Área de serviço:</strong> ${
        quotation.has_laundry === "none" ? "Sem área de serviço" :
        quotation.has_laundry === "compact" ? "Área compacta" : "Área espaçosa"
      }</p>
      <p><strong>Check-in:</strong> ${formatDate(quotation.check_in_date)} ${quotation.check_in_time || "Horário não especificado"}</p>
      <p><strong>Check-out:</strong> ${formatDate(quotation.check_out_date)} ${quotation.check_out_time || "Horário não especificado"}</p>
      <p><strong>Preferência de contato:</strong> ${quotation.contact_preference === "email" ? "Email" : "WhatsApp"}</p>
      <p><strong>Valor da cotação:</strong> ${formattedPrice}</p>
      ${quotation.additional_info ? `<p><strong>Informações adicionais:</strong> ${quotation.additional_info}</p>` : ""}
    `;

    console.log("Sending email via Resend");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Using Resend's test domain
        to: ["devweb3agencia@gmail.com"], // During testing, only send to verified email
        subject: `Nova Cotação - ${quotation.full_name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await res.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-quotation-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);