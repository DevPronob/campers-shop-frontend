
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const FaqSection = () => {
    return (
        <div className='py-5 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex-1 md:flex-[2/4] mb-5 md:mb-0'>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the estimated delivery time for my order?</AccordionTrigger>
                        <AccordionContent className='text-[15px]'>
                            The estimated delivery time for your order depends on your location and the shipping method selected at checkout. Generally, it takes 3-7 business days for standard shipping and 1-3 business days for express shipping.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Can I return or exchange a product if I'm not satisfied?</AccordionTrigger>
                        <AccordionContent className='text-[15px]'>
                            Yes, we offer a 30-day return policy for most of our products. If you are not satisfied with your purchase, you can return it within 30 days of receipt for a full refund or exchange.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How do I track my order?</AccordionTrigger>
                        <AccordionContent className='text-[15px]'>
                            Once your order is shipped, you will receive a shipping confirmation email with a tracking number.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Are there any discounts for bulk purchases?</AccordionTrigger>
                        <AccordionContent className='text-[15px]'>
                            Yes, we offer discounts for bulk purchases on selected products. If you are interested in buying in bulk, please contact our customer service team with the details of your order.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                        <AccordionContent className='text-[15px]'>
                            We accept a variety of payment methods for your convenience. These include major credit and debit cards (Visa, MasterCard, American Express), PayPal, and Stripe. Additionally, we offer Cash on Delivery (COD) for certain locations. Please check our Payment Information page for more details.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className='flex-1 md:flex-[2/4]'>
                <img src="https://i.ibb.co/qphCd8X/blake-wisz-Tcg-ASSD5-G04-unsplash.jpg" alt="Description of the image" className="h-[300px] md:h-[380px] w-full object-cover rounded-lg" />
            </div>
        </div>
    );
}

export default FaqSection;
