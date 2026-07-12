"use client"

import DataTable from "@/components/shared/table/DataTable"
import {
	DataTableFilterConfig,
	DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import {
	serverManagedFilter,
	useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services"
import { PaginationMeta } from "@/types/api.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { adminDoctorSchedulesColumns } from "./adminDoctorSchedulesColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const DOCTOR_SCHEDULE_FILTER_DEFINITIONS = [
	serverManagedFilter.single("isBooked"),
]

const DoctorSchedulesManagementTable = ({ initialQueryString }: { initialQueryString: string }) => {
	const searchParams = useSearchParams()

	const {
		queryStringFromUrl,
		optimisticSortingState,
		optimisticPaginationState,
		isRouteRefreshPending,
		updateParams,
		handleSortingChange,
		handlePaginationChange,
	} = useServerManagedDataTable({
		searchParams,
		defaultPage: DEFAULT_PAGE,
		defaultLimit: DEFAULT_LIMIT,
	})

	const queryString = queryStringFromUrl || initialQueryString

	const {
		searchTermFromUrl,
		handleDebouncedSearchChange,
	} = useServerManagedDataTableSearch({
		searchParams,
		updateParams,
	})

	const {
		filterValues,
		handleFilterChange,
		clearAllFilters,
	} = useServerManagedDataTableFilters({
		searchParams,
		definitions: DOCTOR_SCHEDULE_FILTER_DEFINITIONS,
		updateParams,
	})

	const { data: doctorSchedulesResponse, isLoading, isFetching } = useQuery({
		queryKey: ["admin-doctor-schedules", queryString],
		queryFn: () => getAllDoctorSchedules(queryString),
	})

	const doctorSchedules = doctorSchedulesResponse?.data ?? []
	const meta: PaginationMeta | undefined = doctorSchedulesResponse?.meta

	const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
		return [
			{
				id: "isBooked",
				label: "Status",
				type: "single-select",
				options: [
					{ label: "Booked", value: "true" },
					{ label: "Available", value: "false" },
				],
			},
		]
	}, [])

	const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
		return {
			isBooked: filterValues.isBooked,
		}
	}, [filterValues])

	return (
		<div className="rounded-2xl border bg-card p-3 shadow-sm sm:p-4">
			<DataTable
				data={doctorSchedules}
				columns={adminDoctorSchedulesColumns}
				isLoading={isLoading || isFetching || isRouteRefreshPending}
				emptyMessage="No doctor schedules found."
				sorting={{
					state: optimisticSortingState,
					onSortingChange: handleSortingChange,
				}}
				pagination={{
					state: optimisticPaginationState,
					onPaginationChange: handlePaginationChange,
				}}
				search={{
					initialValue: searchTermFromUrl,
					placeholder: "Search by doctor id, schedule id...",
					debounceMs: 700,
					onDebouncedChange: handleDebouncedSearchChange,
				}}
				filters={{
					configs: filterConfigs,
					values: filterValuesForTable,
					onFilterChange: handleFilterChange,
					onClearAll: clearAllFilters,
				}}
				meta={meta}
			/>
		</div>
	)
}

export default DoctorSchedulesManagementTable
