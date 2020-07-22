import React, { forwardRef, PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { TransitionProps } from "@material-ui/core/transitions";
import { Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

interface ConfirmationDialogProps extends WrappedComponentProps<"intl"> {
  openDialog: boolean;
  onCancel: (...args: any[]) => void;
  onReject: (...args: any[]) => void;
  onApprove: (...args: any[]) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ConfirmationDialog extends PureComponent<ConfirmationDialogProps> {
  render() {
    const { openDialog, onCancel, onReject, onApprove, intl }: ConfirmationDialogProps = this.props;
    return (
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={onCancel}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {intl.formatMessage({ id: "general.dialog.confirmation.title.name" })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onReject}>{intl.formatMessage({ id: "general.action.no.name" })}</Button>
          <Button onClick={onApprove} autoFocus>
            {intl.formatMessage({ id: "general.action.yes.name" })}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default injectIntl(ConfirmationDialog);
