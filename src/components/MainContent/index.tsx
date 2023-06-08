import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default MainContent;
