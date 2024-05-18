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
import TourItem from './tour-item';
import AssignModal from './view/assignModal';

// ----------------------------------------------------------------------

type Props = {
  tours: ITourItem[];
};

export default function TourList({ tours }: Props) {
  const router = useRouter();
  const { events, loading, error, refetch } = useEvents();
  const removeEventMutation = useRemoveEvent();
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const { onToggle, onTrue, onFalse, setValue, value } = useBoolean();
  const [selectedEvent, setSelectedEvent] = useState({});
  const [assignModal, setAssignModal] = useState(false);
  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.tour.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.tour.edit(id));
    },
    [router]
  );

  const handleOpenDeleteModal = useCallback((id: string) => {
    setSelectedEventId(id);
    onTrue();
  }, []);

  const handleAssign = (eventId: any) => {
    const selectedEvent = events?.filter(
      (item: any) => item?._id === eventId
    )[0];
    setSelectedEvent(selectedEvent);
    setAssignModal(true);
  };

  const handleDelete = async () => {
    await removeEventMutation.mutateAsync(selectedEventId);
    setSelectedEventId('');
    refetch();
    onFalse();
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
            onEdit={() => handleEdit(event._id)}
            onDelete={() => handleOpenDeleteModal(event?._id)}
            onAssignVenue={() => handleAssign(event?._id)}
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
