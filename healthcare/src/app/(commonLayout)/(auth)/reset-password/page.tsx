import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm"

interface ResetPasswordPageProps {
  searchParams: Promise<{ email?: string }>
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const params = await searchParams

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <ResetPasswordForm initialEmail={params.email} />
    </div>
  )
}

export default ResetPasswordPage
