import React from "react";
import DOMPurify from "dompurify";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import milestones from "../../text/milestones";
import "react-vertical-timeline-component/style.min.css";
import "../../styles/vertical-timeline.css";

const FakeCheckTimeline = () => {
  const theme = useTheme();
  return (
    <VerticalTimeline
      className="vertical-timeline--one-column-right-mod vertical-timeline-custom-line"
      layout="1-column"
    >
      {milestones.map(milestone => (
        <VerticalTimelineElement
          key={milestone.title}
          className="vertical-timeline-element--work"
          position="right"
          contentStyle={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}
          contentArrowStyle={{
            top: 8,
            left: "100%",
            right: "auto",
            borderLeft: "7px solid rgb(33, 150, 243)",
            transform: "rotate(0deg)",
          }}
          date={milestone.date}
          iconStyle={{ background: theme.palette.primary.main }}
          icon={milestone.icon || <EmojiEventsIcon style={{ color: theme.palette.common.white }} />}
        >
          <Typography variant="h6" style={{ fontSize: 16 }}>
            {milestone.title}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontWeight: "normal" }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(milestone.body) }}
          />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default FakeCheckTimeline;