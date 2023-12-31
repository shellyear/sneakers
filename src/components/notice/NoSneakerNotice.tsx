import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import { ReactComponent as SneakersWithTextSvg } from "../../static/images/stonks.svg";
import { ReactComponent as SneakersWithoutTextSvg } from "../../static/images/girlSneakerWithoutText.svg";
import { theme } from "../../static/styles/theme";

const ImgBox = styled(Box)`
  margin-left: auto;
  margin-right: auto;
`;

const Text = styled(Typography)`
  display: block;
  text-align: center;
`;

export const NoSneakerNotice = () => {
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div>
      <ImgBox mt={15}>
        {isSm ? (
          <SneakersWithoutTextSvg width="100%" />
        ) : (
          <SneakersWithTextSvg width="100%" />
        )}
      </ImgBox>
      {isSm && (
        <Text mt={6} variant="body1" as="div">
          <pre>
            {
              "Seem’s like you still didn’t add\n any new sneaker to your collection"
            }
          </pre>
        </Text>
      )}
    </div>
  );
};
