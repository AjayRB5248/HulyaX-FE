import { useCallback, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import { ITourItem } from 'src/types/tour';
// components
import { useRouter } from 'src/routes/hook';
//
import { useEvents, useRemoveEvent } from 'src/api/events';
import { useBoolean } from 'src/hooks/use-boolean';
import TransitionsDialog from '../_examples/mui/dialog-view/transitions-dialog';
import TourItem from './companyEvent-item';
import AssignModal from '../tour/view/assignModal';


export default function CompanyEventList() {
  const router = useRouter();
  const { events, loading, error, refetch } = useEvents();
  const removeEventMutation = useRemoveEvent();
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [assignModal, setAssignModal] = useState(false);
  const { onToggle, onTrue, onFalse, setValue, value } = useBoolean();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.companyEvents.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.companyEvents.edit(id));
    },
    [router]
  );

  const handleOpenDeleteModal = useCallback((id: string) => {
    setSelectedEvent(id);
    onTrue();
  }, []);

  const handleDelete = async () => {
    await removeEventMutation.mutateAsync(selectedEvent);
    setSelectedEvent('');
    refetch();
    onFalse();
  };

  const handleAssign = (eventId: any) => {
    const selectedEvent = events?.filter(
      (item: any) => item?._id === eventId
    )[0];
    setSelectedEvent(selectedEvent);
    setAssignModal(true);
  };


  return (
    <>
      <Box
        gap={3}
        display='grid'
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {events?.map((event: any) => (
          <TourItem
            key={event._id}
            event={event}
            onView={() => handleView(event?._id)}
            onEdit={() => handleEdit(event?._id)}
            onDelete={() => handleOpenDeleteModal(event?._id)}
            onAssignVenue={() => handleAssign(event._id)}
          />
        ))}
      </Box>

      <TransitionsDialog
        onFalse={onFalse}
        onTrue={handleDelete}
        value={value}
        children={<>Are you sure you want to delete this event?</>}
        trueText={!removeEventMutation.isLoading ? 'Delete' : 'Deleting'}
        falseText='Cancel'
        title='Delete Event'
        isLoading={removeEventMutation.isLoading}
      />

      <AssignModal
        onSubmit={() => {}}
        isOpen={assignModal}
        setAssignModal={setAssignModal}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />

      {events?.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
