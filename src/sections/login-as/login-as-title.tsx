import { m, MotionProps } from "framer-motion";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Box, { BoxProps } from "@mui/material/Box";

import { MotionContainer, varFade } from "src/components/animate";

export default function LoginAsTitle() {
  return (
    <Box
      sx={{
        height: { md: 350, sm: 50 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
      }}
      className="login-as-title-wrapper"
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: "absolute" },
            textAlign: { xs: "center", md: "center" },
            left: { md: 0 },
            right: { md: 0 },
          }}
        >
          <div>
            <Stack
              spacing={2}
              display="inline-flex"
              direction="row"
              justifyContent="center"
              sx={{ color: "common.white" }}
              className="login-as-title-stack"
            >
              <TextAnimate text="Are" sx={{ color: "#4c0080" }} />
              <TextAnimate text="you" sx={{ color: "#4c0080" }} />
              <TextAnimate text="a" sx={{ color: "#4c0080" }} />
              <TextAnimate text="User" sx={{ color: "#4c0080" }} variants={varFade().inRight} />
              <TextAnimate text="or" sx={{ color: "#4c0080" }} />
              <TextAnimate text="a" sx={{ color: "#4c0080" }} />
              <TextAnimate text="Company" sx={{ color: "#4c0080" }} variants={varFade().inRight} />
              <TextAnimate text="?" sx={{ color: "#4c0080" }} />
            </Stack>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      className="login-as-title"
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
