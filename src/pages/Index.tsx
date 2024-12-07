import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuotationForm } from "@/components/QuotationForm";
import { Globe, MessageSquare, BarChart } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
          Faça sua pequena empresa crescer com excelência em marketing digital
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Ajudamos pequenas empresas a prosperar no mundo digital com soluções de
          marketing abrangentes adaptadas às suas necessidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8">
                Começar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <QuotationForm />
            </DialogContent>
          </Dialog>
          <a href="#trabalho" className="text-primary hover:underline">
            Veja nosso trabalho
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Soluções completas de marketing digital
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tudo o que sua pequena empresa precisa para ter sucesso on-line, tudo em
          um só lugar.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Globe className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Desenvolvimento de sites</h3>
            <p className="text-gray-600">
              Sites personalizados e responsivos que convertem visitantes em clientes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <MessageSquare className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Marketing de mídia social</h3>
            <p className="text-gray-600">
              Gestão estratégica de mídias sociais para construir sua marca e envolver seu
              público.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BarChart className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">SEO e Análise</h3>
            <p className="text-gray-600">
              Estratégias de SEO baseadas em dados para melhorar sua visibilidade e
              monitorar o sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/lovable-uploads/a10fb2d0-5f61-4ee4-a346-86f18ae37de2.png"
              alt="Pessoa trabalhando no computador"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Por que escolher a SureSites?</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Estratégias personalizadas para pequenas empresas</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Soluções abrangentes de marketing digital</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Equipe de suporte dedicada</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Histórico comprovado de sucesso</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Planos mensais acessíveis</span>
              </li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-8">
                  Agende uma consulta gratuita
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <QuotationForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar sua presença online?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de pequenas empresas que cresceram com nossa
            experiência em marketing digital.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg">
                Obtenha sua análise gratuita de marketing digital
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <QuotationForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sites Seguros</h3>
              <p className="text-gray-400">
                Seu parceiro em excelência em marketing digital.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Lar</a></li>
                <li><a href="#trabalho" className="text-gray-400 hover:text-white">Nosso Trabalho</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-white">Serviços</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contate-nos</h3>
              <p className="text-gray-400">E-mail: hello@suresites.com</p>
              <p className="text-gray-400">Telefone: (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 SureSites. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
