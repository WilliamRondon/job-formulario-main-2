import { supabase } from "@/integrations/supabase/client";
import { QuotationData, ValidationError } from "@/types/quotation";
import { Database } from "@/integrations/supabase/types";

type QuotationRow = Database['public']['Tables']['quotations']['Row'];

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+55 \(\d{2}\) \d{9}$/;
  return phoneRegex.test(phone);
};

export const formatPhone = (phone: string): string => {
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  return phone;
};

const checkDuplicates = async (email: string, phone: string): Promise<ValidationError[]> => {
  const errors: ValidationError[] = [];
  
  const { data: emailData, error: emailError } = await supabase
    .from("quotations")
    .select("email")
    .eq("email", email);

  if (emailError) {
    console.error("Error checking email duplicates:", emailError);
    throw emailError;
  }

  if (emailData && emailData.length > 0) {
    errors.push({
      field: "email",
      message: "Este email já está cadastrado em nossa base de dados."
    });
  }

  const formattedPhone = formatPhone(phone);
  const { data: phoneData, error: phoneError } = await supabase
    .from("quotations")
    .select("phone")
    .eq("phone", formattedPhone);

  if (phoneError) {
    console.error("Error checking phone duplicates:", phoneError);
    throw phoneError;
  }

  if (phoneData && phoneData.length > 0) {
    errors.push({
      field: "phone",
      message: "Este telefone já está cadastrado em nossa base de dados."
    });
  }

  return errors;
};

export const validateQuotation = async (quotationData: QuotationData): Promise<ValidationError[]> => {
  const errors: ValidationError[] = [];

  if (!validateEmail(quotationData.email)) {
    errors.push({
      field: "email",
      message: "Por favor, insira um email válido."
    });
  }

  const formattedPhone = formatPhone(quotationData.phone);
  if (!validatePhone(formattedPhone)) {
    errors.push({
      field: "phone",
      message: "Por favor, insira um telefone no formato: +55 (XX) XXXXXXXXX"
    });
  }

  if (errors.length === 0) {
    const duplicateErrors = await checkDuplicates(quotationData.email, quotationData.phone);
    errors.push(...duplicateErrors);
  }

  return errors;
};

export const saveQuotation = async (quotationData: QuotationData): Promise<QuotationRow[]> => {
  const validationErrors = await validateQuotation(quotationData);
  
  if (validationErrors.length > 0) {
    throw { errors: validationErrors };
  }

  const formattedData = {
    ...quotationData,
    phone: formatPhone(quotationData.phone)
  };

  const { data, error } = await supabase
    .from("quotations")
    .insert(formattedData)
    .select();

  if (error) throw error;
  return data || [];
};

export const sendQuotationEmail = async (quotationId: string) => {
  const { error } = await supabase.functions.invoke("send-quotation-email", {
    body: { quotationId },
  });

  if (error) throw error;
};