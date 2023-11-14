import { Box, Typography, styled } from "@mui/material";
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
  return (
    <div>
      <ImgBox mt={15}>
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
