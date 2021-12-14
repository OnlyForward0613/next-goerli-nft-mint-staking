import { Button } from '@mui/material';
import { green } from '@mui/material/colors';
import { styled } from '@mui/system';

export const ConnectButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderRadius: 30,
  fontSize: 16,
  fontWeight: 900,
  textTransform: "none",
  backgroundColor: green[600],
  padding: "3px 24px",
  '&:hover': {
    backgroundColor: green[800],
  },
  '&:disabled': {
    color: "#fff",
    backgroundColor: green[600],
  }
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  textTransform: "none",
  backgroundColor: green[600],
  borderColor: `${green[800]} !important`,
  '&:hover': {
    backgroundColor: green[800],
  },
}));