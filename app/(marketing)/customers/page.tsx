import { MarketingPage, CustomerCard } from "@/components/marketing/marketing-page";

export default function CustomersPage() {
  return (
    <MarketingPage title="Customers" description="Teams who switched to Ciel for predictable costs and clearer deployment states.">
      <div className="grid gap-4 md:grid-cols-2">
        <CustomerCard name="Alex Chen" company="Acme Corp" quote="We finally understand what's driving our bandwidth bill. Traffic attribution alone paid for the switch." />
        <CustomerCard name="Jordan Lee" company="Stackform" quote="Failed builds now tell me exactly what to fix. No more spelunking through six tabs." />
        <CustomerCard name="Sam Rivera" company="Docubase" quote="Preview protection is standard, not an upsell. Our stakeholders can review safely." />
        <CustomerCard name="Casey Morgan" company="Launchpad Studio" quote="Migrating from Vercel took an afternoon. The import wizard mapped everything cleanly." />
      </div>
    </MarketingPage>
  );
}
