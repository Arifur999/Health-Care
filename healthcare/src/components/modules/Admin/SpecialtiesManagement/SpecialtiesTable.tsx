"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { getAllSpecialties } from "@/services/doctor.services"
import { type ISpecialty } from "@/types/specialty.types"
import { useQuery } from "@tanstack/react-query"
import CreateSpecialtyFormModal from "./CreateSpecialtyFormModal"
import DeleteSpecialtyConfirmationDialog from "./DeleteSpecialtyConfirmationDialog"
import EditSpecialtyFormModal from "./EditSpecialtyFormModal"
import { specialtiesColumns } from "./specialtiesColumns"

const SpecialtiesTable = () => {
  const {
    editingItem,
    deletingItem,
    isEditModalOpen,
    isDeleteDialogOpen,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<ISpecialty>({ enableView: false })

  const { data: specialtiesResponse, isLoading, isFetching } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
  })

  const specialties = specialtiesResponse?.data ?? []

  return (
    <>
      <DataTable
        data={specialties}
        columns={specialtiesColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No specialties found."
        toolbarAction={<CreateSpecialtyFormModal />}
        actions={tableActions}
      />

      <EditSpecialtyFormModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        specialty={editingItem}
      />

      <DeleteSpecialtyConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        specialty={deletingItem}
      />
    </>
  )
}

export default SpecialtiesTable
