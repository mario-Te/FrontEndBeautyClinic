import React from "react";
import { Badge, IconButton } from "@material-ui/core";
import { ErrorOutlineSharp } from "@material-ui/icons";
import { styled } from "@mui/system";

interface BadgeProps {
  badgeText: string;
  display?: string;
}

const StyledBadge = styled(Badge)({
  backgroundColor: "#ed5249",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: 15,
  borderRadius: 15,
});

const ErrorBadge: React.FC<BadgeProps> = ({ badgeText, display }) => {
  return (
    <IconButton color="inherit">
      <StyledBadge sx={{ display: display }}>
        <ErrorOutlineSharp />
        <span style={{ marginRight: 15 }}>{badgeText}</span>
      </StyledBadge>
    </IconButton>
  );
};

export default ErrorBadge;
