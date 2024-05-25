import { Button } from "@mui/base";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface VideoProps {
  title: string;
  videoUrl: string;
  open: boolean;
  handleClose: () => void;
}

const VideoDialog: React.FC<VideoProps> = ({ title, videoUrl, open, handleClose }) => {
  console.log(open, "open");
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="video-dialog-title" maxWidth="md" fullWidth>
      <DialogTitle id="video-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <iframe
          width="100%"
          height="400"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" className="text-dark">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoDialog;
