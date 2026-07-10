import VerifyEmailForm from "@/components/modules/Auth/VerifyEmailForm"

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const params = await searchParams

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <VerifyEmailForm initialEmail={params.email} />
    </div>
  )
}

export default VerifyEmailPage
