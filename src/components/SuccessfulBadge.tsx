import React from "react";
import { Badge, IconButton } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { styled } from "@mui/system";

interface SuccessfulBadgeProps {
  badgeText: string;
  display?: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: "#4CAF50",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  width: "70%",
  padding: 15,
  borderRadius: 15,
}));

const SuccessfulBadge: React.FC<SuccessfulBadgeProps> = ({
  badgeText,
  display,
}) => {
  return (
    <IconButton color="inherit">
      <StyledBadge style={{ display: display }}>
        <CheckCircle />
        <span style={{ marginRight: 15 }}>{badgeText}</span>
      </StyledBadge>
    </IconButton>
  );
};

export default SuccessfulBadge;
