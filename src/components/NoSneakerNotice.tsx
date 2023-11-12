import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import { ReactComponent as SneakersWithTextSvg } from "../images/stonks.svg";
import { ReactComponent as SneakersWithoutTextSvg } from "../images/girlSneakerWithoutText.svg";
import { theme } from "../styles/theme";

const ImgBox = styled(Box)`
  height: 100%;
  width: 100%;
  max-width: 868px;
  max-height: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Text = styled(Typography)`
  display: block;
  text-align: center;
`;

export const NoSneakerNotice = () => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <ImgBox mt={15}>
        {isMd ? <SneakersWithoutTextSvg /> : <SneakersWithTextSvg />}
      </ImgBox>
      {isMd && (
        <Text mt={6} variant="body1">
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
