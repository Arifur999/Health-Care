import DashboardNavbar from "@/components/modules/Dashboard/dashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/dashboardSidebar";

const RootDashboardLayout = async ({children}:{children: React.ReactNode})=> {
  return (
    <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />

      {/* sidebar */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* navbar */}
        <DashboardNavbar />
        {/* content */}
        <main className=" flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
            {/* content */}
            {children}
        </main>
      </div>
    </div>
  )
}

export default RootDashboardLayout;