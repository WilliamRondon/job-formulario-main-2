import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { QuotationStepOne } from "./quotation/QuotationStepOne";
import { QuotationStepTwo } from "./quotation/QuotationStepTwo";
import { QuotationStepThree } from "./quotation/QuotationStepThree";
import { useQuotationForm } from "@/hooks/useQuotationForm";

export function QuotationForm() {
  const {
    formData,
    price,
    isSubmitting,
    updateFormData,
    handleNext,
    handleBack,
    handleSubmit,
  } = useQuotationForm();

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <Tabs value={`step-${formData.step}`} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="step-1" disabled>
            Detalhes
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled>
            Data e localização
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled>
            Contato
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step-1">
          <QuotationStepOne
            formData={formData}
            updateFormData={updateFormData}
            handleNext={handleNext}
          />
        </TabsContent>

        <TabsContent value="step-2">
          <QuotationStepTwo
            formData={formData}
            updateFormData={updateFormData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </TabsContent>

        <TabsContent value="step-3">
          <QuotationStepThree
            formData={formData}
            price={price}
            updateFormData={updateFormData}
            handleBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}