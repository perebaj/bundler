import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOrganization } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface ProcessData {
  process_id: string;
  title: string;
  assignedMember?: string;
  // Add other fields as needed
}

interface OrganizationMember {
  id: string;
  publicUserData: {
    userId: string;
    identifier: string;
    imageUrl: string;
  };
  role: string;
}

export const getAdminColumns = <TData extends ProcessData>(
  isAdmin: boolean,
  onAssignMember: (processId: string, memberId: string) => void,
): ColumnDef<TData>[] => {
  if (!isAdmin) return [];

  const AdminCell = ({ row }: { row: any }) => {
    const { organization } = useOrganization();
    const [members, setMembers] = useState<OrganizationMember[]>([]);
    const process = row.original;
    const [assignedMember, setAssignedMember] =
      useState<OrganizationMember | null>(null);

    useEffect(() => {
      const fetchMembers = async () => {
        if (organization) {
          const { data } = await organization.getMemberships();
          setMembers(data as OrganizationMember[]);

          // Find the assigned member
          const assigned = data.find(
            (member) => member.publicUserData.userId === process.assignedMember,
          ) as OrganizationMember | undefined;
          setAssignedMember(assigned || null);
        }
      };
      fetchMembers();
    }, [organization, process.assignedMember]);

    return (
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    {assignedMember ? (
                      <AvatarImage
                        src={assignedMember.publicUserData.imageUrl}
                        alt={assignedMember.publicUserData.identifier}
                      />
                    ) : (
                      <AvatarFallback>+</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {assignedMember
                ? assignedMember.publicUserData.identifier
                : "Assign Member"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent>
          {members.map((member) => (
            <DropdownMenuItem
              key={member.id}
              onClick={() => {
                onAssignMember(
                  process.process_id,
                  member.publicUserData.userId,
                );
                setAssignedMember(member);
              }}
            >
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage
                  src={member.publicUserData.imageUrl}
                  alt={member.publicUserData.identifier}
                />
                <AvatarFallback>
                  {member.publicUserData.identifier.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {member.publicUserData.identifier}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return [
    {
      accessorKey: "assignedMember",
      header: "Resp",
      cell: AdminCell,
    },
  ];
};
