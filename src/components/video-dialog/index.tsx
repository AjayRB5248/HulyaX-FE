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
          controls
          width={'100%'}
          height={'100%'}
          style={{
            objectFit: 'cover',
          }}
          url='https://videos.pexels.com/video-files/3945446/3945446-uhd_4096_2160_25fps.mp4'
        />
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
