"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getAllSpecialties, getDoctors } from "@/services/doctor.services"
import { services } from "@/lib/servicesData"
import { type IDoctor } from "@/types/doctor.types"
import { type ISpecialty } from "@/types/specialty.types"
import { useQuery } from "@tanstack/react-query"
import { Search, Stethoscope, Syringe, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface GlobalSearchProps {
  trigger?: React.ReactNode
}

const useDebouncedValue = (value: string, delayMs: number) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}

const GlobalSearch = ({ trigger }: GlobalSearchProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouncedValue(query, 400)

  const { data: doctorsResponse, isFetching } = useQuery({
    queryKey: ["global-search-doctors", debouncedQuery],
    queryFn: () => getDoctors(`searchTerm=${encodeURIComponent(debouncedQuery)}&limit=5`),
    enabled: open && debouncedQuery.trim().length > 1,
  })

  const { data: specialtiesResponse } = useQuery({
    queryKey: ["global-search-specialties"],
    queryFn: getAllSpecialties,
    enabled: open,
    staleTime: 1000 * 60 * 60,
  })

  const doctors: IDoctor[] = doctorsResponse?.data ?? []
  const specialties: ISpecialty[] = (specialtiesResponse?.data ?? []).filter((specialty: ISpecialty) =>
    specialty.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase()),
  )
  const matchedServices = services.filter((service) =>
    service.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase()),
  )

  const hasQuery = debouncedQuery.trim().length > 1
  const hasResults = doctors.length > 0 || specialties.length > 0 || matchedServices.length > 0

  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setQuery("")
    }
  }

  const handleViewAllDoctors = () => {
    if (!query.trim()) return
    router.push(`/consultation?searchTerm=${encodeURIComponent(query.trim())}`)
    handleClose(false)
  }

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setOpen(true)}>
          <Search className="size-5" aria-hidden="true" />
          <span className="sr-only">Search</span>
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg gap-0 p-0">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle className="sr-only">Search MEDdical</DialogTitle>
            <div className="flex items-center gap-2">
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleViewAllDoctors()
                }}
                placeholder="Search doctors, specialties, services..."
                aria-label="Search doctors, specialties, services"
                className="border-0 shadow-none focus-visible:ring-0"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="cursor-pointer text-muted-foreground hover:text-foreground">
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto p-2">
            {!hasQuery && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Start typing to search for doctors, specialties, or services.
              </p>
            )}

            {hasQuery && !isFetching && !hasResults && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results for &ldquo;{debouncedQuery}&rdquo;.
              </p>
            )}

            {doctors.length > 0 && (
              <div className="space-y-1 py-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Doctors</p>
                {doctors.map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/consultation/doctor/${doctor.id}`}
                    onClick={() => handleClose(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Stethoscope className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="truncate">{doctor.name}</span>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleViewAllDoctors}
                  className="w-full cursor-pointer px-3 py-2 text-left text-xs font-medium text-primary hover:underline"
                >
                  View all doctors matching &ldquo;{query}&rdquo;
                </button>
              </div>
            )}

            {specialties.length > 0 && (
              <div className="space-y-1 py-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Specialties</p>
                {specialties.slice(0, 5).map((specialty) => (
                  <Link
                    key={specialty.id}
                    href={`/consultation?specialties.specialty.title=${encodeURIComponent(specialty.title)}`}
                    onClick={() => handleClose(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Syringe className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="truncate">{specialty.title}</span>
                  </Link>
                ))}
              </div>
            )}

            {matchedServices.length > 0 && (
              <div className="space-y-1 py-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services</p>
                {matchedServices.slice(0, 5).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/diagnostics/${service.slug}`}
                    onClick={() => handleClose(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Search className="size-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GlobalSearch
