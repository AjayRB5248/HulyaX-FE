import { Card, FormLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useAssignCompany } from 'src/api/superAdmin';
import { useAllUsersByRole } from 'src/api/users';
import { useVenues } from 'src/api/venues';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({});

const AssignModal = ({ isOpen, setAssignModal, selectedEvent }: any) => {
  const [data, setData] = useState([]);
  const { venues } = useVenues();
  const { users } = useAllUsersByRole('companyAdmin');
  const assignCompanyMutation = useAssignCompany();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedEvent?._id) {
      const result = selectedEvent.states?.map((state) => {
        const assignedCompany = selectedEvent?.assignedCompany?.find(
          (company) => company.state === state._id
        );
        const venue = selectedEvent?.venue?.find(
          (venue) => venue.state === state._id
        );

        return {
          state: {
            name: state.stateName,
            _id: state._id,
          },
          company: assignedCompany ? assignedCompany.companyId : '',
          venue: venue ? venue.venueId : '',
          date: '', // Assuming the date is not provided in the initial data
        };
      });

      // const initialData = selectedEvent?.states?.map((item: any) => ({
      //   state: {
      //     name: item?.stateName,
      //     _id: item?._id,
      //   },
      //   company: '',
      //   venue: '',
      //   date: '',
      // }));

      setData(result);
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
          const response = await assignCompanyMutation.mutateAsync(data);
          const venueData = {
            subEventId: response?.insertedSubEvents[0]?._id,
            venues: [
              {
                _id: singleData?.venue,
                date: singleData?.date,
              },
            ],
          };
          if (singleData?.venue) {
            await addVenue(venueData);
          }
        }
      }
      setAssignModal(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const addVenue = (data: any): Promise<any> => {
    return axiosInstance
      .post('superadmin/update-venue-subevent', {
        ...data,
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Dialog open={isOpen} onClose={() => setAssignModal(false)}>
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
                  style={{ minWidth: 100 }}
                  value={item.venue}
                  onChange={(e: any) =>
                    handleSelectChange(index, 'venue', e?.target?.value)
                  }
                >
                  {venues?.venues?.map((venueItem: any) => {
                    return (
                      <MenuItem key={venueItem?._id} value={venueItem?._id}>
                        {venueItem?.venueName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>

              {/* company */}
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
                  style={{ minWidth: 100 }}
                  value={item.company}
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

              {/* date */}
              <DateTimePicker
                onChange={(e: any) =>
                  handleSelectChange(index, 'date', new Date(e).toISOString())
                }
                label='Date of Event'
                inputFormat='yyyy-MM-dd HH:mm'
              />
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
