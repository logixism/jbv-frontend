import {
  AccordionContent,
  Accordion,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";


export default function Page() {
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-3xl font-semibold">Questions about JBValues</h1>
      <div className="mt-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is JBValues?</AccordionTrigger>
            <AccordionContent>
              JB Values is a roblox jailbreak trading website created to provide
              you with various different features to aid you in trading.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Where do values come from?</AccordionTrigger>
            <AccordionContent>
              Our values are determined by averaging values from the most
              experienced and reputable traders in our community. These experts
              are able to create submissions based off their trading experience.
              Before these submissions have an impact on an items value, each
              submission will undergo thorough review, and only those that are
              reasonable and unbiased are accepted. As an additional feature for
              more personalized values, you can choose to view values from a
              specific team member. We also hold meetings approximately every
              other day to discuss various items and the changes they have
              experienced in the jailbreak market, as well as to determine the
              best ways to reflect these changes onto our values.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Where does item info come from?</AccordionTrigger>
            <AccordionContent>
              All item information is sourced from official data provided by
              Badimo.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is JBValues 100% accurate?</AccordionTrigger>
            <AccordionContent>
              Although it is impossible for a value list to be 100% accurate,
              our team works extremely hard to provide you with the most
              accurate information possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is JBValues official?</AccordionTrigger>
            <AccordionContent>
              JB Values is a fan made website that is not currently officially
              affiliated with Badimo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <h1 className="mt-8 text-3xl font-semibold">Questions about Jailbreak</h1>
      <div className="mt-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Jailbreak?</AccordionTrigger>
            <AccordionContent>
              Jailbreak is a 12 time award winning game where you can either
              live the life of a criminal robbing stores, break laws, and fight
              off cops, or as a cop catching criminals and fighting off crime!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Jailbreak Trading?</AccordionTrigger>
            <AccordionContent>
              Trading is a feature added to jailbreak on June 10th, 2022. This
              feature allows players to trade vehicles, vehicle customizations,
              weapon skins, safes, and furniture items with each other.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
