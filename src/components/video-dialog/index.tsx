import { Dialog, DialogContent } from '@mui/material';
import ReactPlayer from 'react-player/lazy';

interface VideoProps {
  title: string;
  videoUrl: string;
  open: boolean;
  handleClose: () => void;
}

const VideoDialog: React.FC<VideoProps> = ({
  title,
  videoUrl,
  open,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='video-dialog-title'
      maxWidth='md'
      fullWidth
    >
      <DialogContent
        style={{
          padding: 0,
          height: 'fit-content',
        }}
      >
        <ReactPlayer
          playing={true}
          controls
          width={'100%'}
          height={'100%'}
          style={{
            objectFit: 'cover',
          }}
          url='https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/landscape.mp4'
        />
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
