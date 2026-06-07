"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

const doctorColumns: ColumnDef<IDoctor>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "designation", header: "Designation" },
    { accessorKey: "qualification", header: "Qualification" },
    { accessorKey: "experience", header: "Experience" },
    { accessorKey: "appointmentFee", header: "Fee" },
];

const DoctorsTable = () => {

   

    const { data : doctorDataResponse, isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    });

    const doctors = doctorDataResponse || [];

    const handleView = (doctor : IDoctor) => {
        console.log("View doctor", doctor);
    }

    const handleEdit = (doctor : IDoctor) => {
        console.log("Edit doctor", doctor);
    }

    const handleDelete = (doctor : IDoctor) => {
        console.log("Delete doctor", doctor);
    }


    // const { getHeaderGroups, getRowModel } = useReactTable({
    //    data: doctors,
    //    columns: doctorColumns,
    //    getCoreRowModel: getCoreRowModel(),
    // });   

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctors);
  // return (
  //   <Table>
  //     <TableHeader>
  //       {getHeaderGroups().map((hg) => (
  //         <TableRow key={hg.id}>
  //           {hg.headers.map((header) => (
  //             <TableHead key={header.id}>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext(),
  //               )}
  //             </TableHead>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableHeader>
  //     <TableBody>
  //       {getRowModel().rows.map((row) => (
  //         <TableRow key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <TableCell key={cell.id}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </TableCell>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // );

    return (
      <DataTable
        data={doctors}
        columns={doctorColumns}
        isLoading={isLoading}
        emptyMessage="No doctors found."
        actions={
          {
            onView : handleView,
            onEdit : handleEdit,
            onDelete : handleDelete
          }
        }
      />
    )

}




export default DoctorsTable
