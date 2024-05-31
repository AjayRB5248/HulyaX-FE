import 'moment-timezone';

import { Card, FormLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useAssignCompany, useRemoveAssginedCompany } from 'src/api/superAdmin';
import { useAllUsersByRole } from 'src/api/users';
import { useVenues } from 'src/api/venues';
import { useAuth } from 'src/auth/context/users/auth-context';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({});

const AssignModal = ({
  isOpen,
  setAssignModal,
  selectedEvent,
  setSelectedEvent,
  refetch,
}: any) => {
  const [data, setData] = useState<any>([]);
  const { user } = useAuth();
  const { venues } = useVenues();
  const { users } = useAllUsersByRole('companyAdmin');
  const assignCompanyMutation = useAssignCompany();
  const removeAssiginedCompany = useRemoveAssginedCompany();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEvent?._id && user?.role !== 'companyAdmin') {
      const result = selectedEvent.states?.map((state: any) => {
        const assignedCompany = selectedEvent?.assignedCompany?.find(
          (company: any) => company.state === state._id
        );
        const venue = selectedEvent?.venueData?.find(
          (venue: any) => venue.state === state._id
        );
        const date = selectedEvent?.childEvents?.find(
          (event: any) => event?.state?._id === state._id
        )?.venues[0]?.eventDate;

        const stateTimeZone = state?.timeZone;

        return {
          state: {
            name: state.stateName,
            _id: state._id,
          },
          company: assignedCompany?._id ? assignedCompany.companyId : '',
          venue: venue?._id ? venue._id : '',
          date: date
            ? new Date(
                moment(formatDateToTimezone(date, stateTimeZone)).format(
                  'YYYY-MM-DD HH:mm'
                )
              )
            : '',
          deleteOption: assignedCompany?.companyId ? true : false,
        };
      });

      setData(result);
    }

    if (selectedEvent?._id && user?.role == 'companyAdmin') {
      const data: any = {
        state: {
          name: selectedEvent?.state.stateName,
          _id: selectedEvent?.state._id,
        },
        company: '',
        venue: selectedEvent?.venues[0]?.venueId?._id,
        date: selectedEvent?.venues[0]?.eventDate
          ? new Date(selectedEvent?.venues[0]?.eventDate)
          : '',
      };
      setData([data]);
    }
  }, [selectedEvent?._id]);

  const handleSelectChange = (index: number, field: string, value: string) => {
    const updatedData: any = data.map((item: any, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };

  const onsubmit = async (data: any) => {
    setLoading(true);

    try {
      for (const singleData of data) {
        const stateTimeZone = selectedEvent?.states.find(
          (item: any) => item?._id === singleData?.state?._id
        )?.timeZone;

        const newDate = moment(
          changeTimezone(singleData?.date, stateTimeZone).format()
        );

        if (singleData?.company) {
          const data = {
            eventId: selectedEvent?._id,
            assignments: [
              {
                state: singleData?.state?._id,
                companies: [singleData?.company],
              },
            ],
          };

          let venueData = {};

          if (singleData?.deleteOption) {
            const subEventId = selectedEvent?.assignedCompany.find(
              (item: any) => item?.state === singleData?.state?._id
            )?.subEventId;

            venueData = {
              subEventId,
              venues: [
                {
                  _id: singleData?.venue,
                  date: newDate,
                },
              ],
            };
          } else {
            const response = await assignCompanyMutation.mutateAsync(data);
            venueData = {
              subEventId: response?.insertedSubEvents[0]?._id,
              venues: [
                {
                  _id: singleData?.venue,
                  date: newDate,
                },
              ],
            };
          }
          if (singleData?.venue) {
            await addVenue(venueData);
          }
        }

        if (user?.role === 'companyAdmin') {
          const venueData = {
            subEventId: selectedEvent?._id,
            venues: [
              {
                _id: singleData?.venue,
                date: newDate,
              },
            ],
          };
          if (singleData?.venue) {
            await addVenue(venueData);
          }
        }
      }

      enqueueSnackbar('Assigned Successfully!', {
        variant: 'success',
      });
      setAssignModal(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const addVenue = async (data: any): Promise<any> => {
    return axiosInstance
      .post('superadmin/update-venue-subevent', {
        ...data,
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleDeleteCompany = async (state: string, companyId: string) => {
    const { lo } = await removeAssiginedCompany.mutateAsync({
      eventId: selectedEvent?._id,
      state,
      companyId,
    });

    setSelectedEvent({});
    setAssignModal(false);
    refetch();
  };

  function changeTimezone(pickedDate: any, newTimezone: any) {
    let date = moment(pickedDate);

    let newDate = date.clone().tz(newTimezone, true);

    return newDate;
  }

  function formatDateToTimezone(dateString: any, timeZone: any) {
    const date: any = new Date(dateString);

    if (isNaN(date)) {
      throw new Error('Invalid date');
    }

    // Format the date to the desired timezone
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timeZone,
    }).format(date);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setAssignModal(false);
        setSelectedEvent({});
      }}
    >
      <DialogTitle>Assign Venue and Company</DialogTitle>
      <DialogContent>
        {data?.map((item: any, index) => {
          return (
            <Card
              key={index}
              sx={{ p: 2, mb: 2 }}
              style={{
                display: 'flex',
                gap: 15,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                }}
              >
                <FormLabel>State Name</FormLabel>
                <TextField
                  type='text'
                  margin='dense'
                  variant='outlined'
                  style={{ minWidth: 250 }}
                  value={item?.state?.name}
                  disabled
                />
              </div>

              {/* venue */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                }}
              >
                <FormLabel>Venue</FormLabel>
                <Select
                  label='Venue'
                  name={`venue`}
                  style={{ minWidth: 250 }}
                  value={item?.venue}
                  onChange={(e: any) =>
                    handleSelectChange(index, 'venue', e?.target?.value)
                  }
                >
                  {venues?.venues
                    ?.filter(
                      (venue: any) => item?.state?._id === venue?.state?._id
                    )
                    .map((venueItem: any) => {
                      return (
                        <MenuItem key={venueItem?._id} value={venueItem?._id}>
                          {venueItem?.venueName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              {/* company */}
              {user?.role === 'superAdmin' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                  }}
                >
                  <FormLabel>User/Company</FormLabel>
                  <Select
                    label='User/Company'
                    name={`company`}
                    style={{ minWidth: 250 }}
                    value={item.company}
                    fullWidth
                    onChange={(e) =>
                      handleSelectChange(index, 'company', e?.target?.value)
                    }
                  >
                    {users?.map((userItem: any) => {
                      return (
                        <MenuItem key={userItem?._id} value={userItem?._id}>
                          {userItem?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              )}

              {/* date */}
              <DateTimePicker
                onChange={(date) => handleSelectChange(index, 'date', date)}
                value={item?.date}
                sx={{ minWidth: 250 }}
                label='Date of Event'
                inputFormat='yyyy-MM-dd HH:mm'
              />

              {item?.deleteOption && user?.role === 'superAdmin' && (
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() =>
                    handleDeleteCompany(item?.state?._id, item.company)
                  }
                >
                  Remove Company
                </Button>
              )}
            </Card>
          );
        })}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setAssignModal(false)}
          variant='outlined'
          color='inherit'
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={() => onsubmit(data)}
          variant='contained'
        >
          {!loading ? 'Save' : 'Saving'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignModal;
