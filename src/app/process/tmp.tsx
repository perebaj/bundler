// import { useState, useMemo } from "react";
// import { useUser } from "@clerk/nextjs";
// import { getAdminColumns } from "./adminColumns";

// // ... other imports ...

// export function DataTable<TData extends ProcessData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   // ... existing state ...

//   const { user } = useUser();
//   const [organizationMembers, setOrganizationMembers] = useState<string[]>([
//     "Member 1",
//     "Member 2",
//     "Member 3",
//   ]); // Replace with actual organization members

//   const isAdmin = useMemo(() => {
//     // Replace with your actual admin check logic
//     return user?.publicMetadata?.role === "admin";
//   }, [user]);

//   const handleAssignMember = (processId: string, memberId: string) => {
//     // Implement the logic to assign a member to a process
//     console.log(`Assigning ${memberId} to process ${processId}`);
//     // You should update your data source here
//   };

//   const allColumns = useMemo(() => {
//     const adminCols = getAdminColumns<TData>(isAdmin, organizationMembers, handleAssignMember);
//     return [...columns, ...adminCols];
//   }, [columns, isAdmin, organizationMembers]);

//   const table = useReactTable({
//     data,
//     columns: allColumns, // Use the combined columns here
//     // ... other table options ...
//   });

//   // ... rest of the component ...

//   return (
//     <div className="w-full">
//       {/* ... existing JSX ... */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {/* ... existing header cells ... */}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {/* ... existing cells ... */}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={allColumns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* ... existing JSX ... */}
//     </div>
//   );
// }
