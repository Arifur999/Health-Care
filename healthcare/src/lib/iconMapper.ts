import {
  Activity,
  Calendar,
  CalendarClock,
  Circle,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  Home,
  Hospital,
  LayoutDashboard,
  Settings,
  Shield,
  Star,
  Stethoscope,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Calendar,
  Calender: Calendar,
  CalendarClock,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  Home,
  Hospital,
  LayoutDashboard,
  Settings,
  Shield,
  Star,
  Stethoscope,
  User,
  Users,
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] ?? Circle;
};
