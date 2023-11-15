import {
  Box,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as NoSortedSneakersSvg } from "../../static/images/sorted-not-found.svg";

const ImgBox = styled(Box)`
  margin-left: auto;
  margin-right: auto;
`;

const Text = styled(Typography)`
  display: block;
  text-align: center;
`;

export const NoSortedSneakerNotice = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div>
      <ImgBox mt={isMd ? 15 : 8}>
        <NoSortedSneakersSvg width="100%" />
      </ImgBox>
      <Box mt={6}>
        <Text
          variant="body1"
          as="div"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.5 }}
        >
          {"Search better.\n There is nothing like this in your collection."}
        </Text>
      </Box>
    </div>
  );
};
