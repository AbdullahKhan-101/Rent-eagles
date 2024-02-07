import NestedHostedNavbar from "@/components/NestedHostedNavbar";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <NestedHostedNavbar />
      <div className="lg:max-w-[70%] px-4 w-full mx-auto py-12">{children}</div>
    </section>
  );
}
