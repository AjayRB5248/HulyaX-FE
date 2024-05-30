// @mui
import {
  Button,
  Card,
  CircularProgress,
  FormLabel,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
// hooks
// utils
// types
// components
import moment from 'moment';
import { useState } from 'react';
import { isValidEmail } from 'src/auth/context/jwt/utils';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

const sendTicket = (data: any) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/tickets/send-ticket', {
        ...data,
      })
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(new Error(`Unexpected status code: ${response.status}`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function OrderTableRow({ row }: Props) {
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendTicketModal, setSendTicketModal] = useState(false);
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleDownloadTicket = (ticketId: string) => {
    setDownloading(true);
    sendTicket({ ticketId })
      .then((res: any) => {
        if (res?.ticket) {
          const link = document.createElement('a');
          link.href = res.ticket;
          link.setAttribute('download', 'ticket.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        enqueueSnackbar("Ticket Downloaded Successfully!", { variant: "success" });
      })
      .catch((error) => {
        console.error('Failed to download ticket:', error);
        enqueueSnackbar(error.response.data.message || "Error updating profile", {
          variant: "error",
        });
      })
      .finally(() => {
        setDownloading(false);
      });
  };
  const handleSendTicket = (ticketId: string) => {
    if (!isValidEmail(email)) return;

    setSending(true);
    sendTicket({ ticketId, isSendToEmail: true, emailTo: email })
      .then((res: any) => {
        setSendTicketModal(false);
        setEmail('');
        enqueueSnackbar('Ticket Sent Successfully!', {
          variant: 'success',
        });
      })
      .catch((error) => {
        console.error('Failed to download ticket:', error);
      })
      .finally(() => {
        setSending(false);
      });
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <Box
            // onClick={onViewRow}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {row?._id}
          </Box>
        </TableCell>

        <TableCell>{row?.eventName}</TableCell>

        <TableCell>
          {row?.venues
            ?.map((item: any) => moment(item?.eventDate).format('MMMM DD, YYYY h:mm:ss A Z'))
            .join(', ')}
        </TableCell>
        <TableCell>
          {row?.ticketType}
        </TableCell>
        <TableCell>
          AUD-{row?.perTicketPrice}
        </TableCell>

        <TableCell>
          {row?.artistDetails
            ?.map((item: any) => item?.artistName)
            .join(', ')}
        </TableCell>
        <TableCell>
          {row?.venues
            ?.map((item: any) => item?.venueDetails?.venueName)
            .join(', ')}
        </TableCell>

        <TableCell>
          {
            <Label
              variant='soft'
              color={
                (row?.status === 'CONFIRMED' && 'success') ||
                (row?.status === 'PENDING' && 'warning') ||
                (row?.status === 'CANCELLED' && 'error') ||
                'default'
              }
            >
              {row?.status}
            </Label>
          }
        </TableCell>
        <TableCell>
          <Stack direction='row' style={{ display: 'flex', width: '100%' }}>
            <Tooltip title='Download Ticket'>
              <IconButton
                color='primary'
                style={{
                  flex: '1',
                }}
                onClick={() => handleDownloadTicket(row?._id)}
                disabled={downloading}
              >
                {!downloading ? (
                  <Iconify icon='eva:download-outline' />
                ) : (
                  <CircularProgress size={22} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title='Send Ticket'>
              <IconButton
                color='primary'
                style={{
                  flex: '1',
                }}
                onClick={() => setSendTicketModal(true)}
                disabled={sending}
              >
                {!sending ? (
                  <Iconify icon='ion:mail-outline' />
                ) : (
                  <CircularProgress size={22} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <Modal
        open={sendTicketModal}
        onClose={() => setSendTicketModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Card
          style={{
            padding: 30,
            width: 'clamp(280px, 50vw, 600px)',
          }}
        >
          <Typography id='modal-modal-title' variant='h3' component='h3'>
            Send Ticket via Email
          </Typography>

          <div
            style={{
              marginTop: 30,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FormLabel
              style={{
                fontSize: 16,
                color: 'black',
              }}
            >
              Enter recipient's email address
            </FormLabel>
            <TextField
              size='medium'
              label='Email'
              id='filled-basic'
              variant='filled'
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </div>

          <Stack direction='row' spacing={2} marginTop={2}>
            <Button
              variant='outlined'
              onClick={() => setSendTicketModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              onClick={() => handleSendTicket(row?._id)}
              endIcon={<Iconify icon='mingcute:send-fill' />}
            >
              {!sending ? 'Send' : <CircularProgress size={22} />}
            </Button>
          </Stack>
        </Card>
      </Modal>
    </>
  );
}
