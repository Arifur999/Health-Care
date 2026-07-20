import { UserRole } from "@/lib/authUtils"

export interface IAdminListItem {
  id: string
  name: string
  email: string
  profilePhoto?: string | null
  contactNumber?: string | null
  userId: string
  user?: {
    id: string
    email: string
    role: UserRole
    status: "ACTIVE" | "BLOCKED" | "DELETED"
  }
}
