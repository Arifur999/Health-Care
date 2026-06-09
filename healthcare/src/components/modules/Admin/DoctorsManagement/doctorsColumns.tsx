import { IDoctor } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";

const doctorColumns: ColumnDef<IDoctor>[] = [
    { id: "name", accessorKey: "name", header: "Name" },
    { id: "experience",
         accessorKey: "experience",
         header: "Experience",
            cell: ({ row }) => {
                return (
                    <span className="text-sm font-medium">{row.original.experience ?? 0} years</span> 
                )
            }
        
        },
    { id: "contactNumber",
         accessorKey: "contactNumber",
         header: "Contact Number",
         
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {row.original?.contactNumber || "N/A"}
                        </span> 
                    </div>
                )
            }
        
        },
    { id: "appointmentFee",
         accessorKey: "appointmentFee",
         header: "Appointment Fee",
         
            cell: ({ row }) => {
                return (
                   
                        <span className="text-sm font-medium">
                            {row.original?.appointmentFee?.toFixed(2) ?? "N/A"}
                        </span> 
                    
                )
            }
        
        },
    { id: "appointmentFee",
         accessorKey: "appointmentFee",
         header: "Appointment Fee",
         
            cell: ({ row }) => {
                return (
                   
                        <span className="text-sm font-medium">
                            {row.original?.appointmentFee?.toFixed(2) ?? "N/A"}
                        </span> 
                    
                )
            }
        
        },
];