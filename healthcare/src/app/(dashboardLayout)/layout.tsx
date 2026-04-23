const RootDashboardLayout = async ({children}:{children: React.ReactNode})=> {
  return (
    <div>
      {/* sidebar */}
      <div>
        {/* navbar */}
        <main>
            {/* content */}
            {children}
        </main>
      </div>
    </div>
  )
}

export default RootDashboardLayout;