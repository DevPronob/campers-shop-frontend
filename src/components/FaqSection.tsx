import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FaqSection = () => {
  return (
    <section className="px-4 md:px-12 py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        
        <div className="flex-1 md:flex-[3/5]">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            Have questions about your order, shipping, or payments? 
            Find quick answers below — we’re here to ensure your shopping experience 
            is seamless from start to finish.
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                What is the estimated delivery time for my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed">
                Delivery times depend on your location and chosen shipping method. 
                Standard shipping typically takes 3–7 business days, while express shipping 
                arrives within 1–3 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                Can I return or exchange a product if I'm not satisfied?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed">
                Absolutely. We offer a 30-day return or exchange policy on most products. 
                Simply return your item within 30 days of receipt for a refund or exchange.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                How do I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed">
                Once your order ships, we’ll send a confirmation email containing your tracking number 
                and a direct link to monitor your package.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                Are there any discounts for bulk purchases?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed">
                Yes. We provide special pricing for bulk or corporate orders. 
                Please contact our customer support team with your details to receive a custom quote.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed">
                We accept all major credit and debit cards (Visa, MasterCard, American Express), 
                as well as PayPal and Stripe. Cash on Delivery is also available in select regions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        
        <div className="flex-1 md:flex-[2/5]">
          <img
            src="https://i.ibb.co/qphCd8X/blake-wisz-Tcg-ASSD5-G04-unsplash.jpg"
            alt="Shopping illustration"
            className="h-[300px] md:h-[420px] w-full object-cover rounded-2xl shadow-xl 
                       transform hover:scale-[1.03] transition-transform duration-300 ease-out"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
