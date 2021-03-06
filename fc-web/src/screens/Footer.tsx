import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../store/rootReducer";
import { injectIntl, WrappedComponentProps, useIntl } from "react-intl";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { NAVIGATION_BLACK } from "../styles/colours";
import { LEGAL_PRIVACY_POLICY_PATH, LEGAL_CONTACT_PATH, ACCESSIBILITY_PATH } from "../static/paths";

interface FooterProps extends WrappedComponentProps<"intl"> {
  locale: string;
}

const RecaptchaLegalLink = ({ nameId, href }) => {
  const intl = useIntl();
  return (
    <Link href={href} color="inherit">
      {intl.formatMessage({ id: nameId })}
    </Link>
  );
};

class Footer extends Component<FooterProps> {
  render() {
    return (
      <Box component="footer" bgcolor={NAVIGATION_BLACK} color="primary.contrastText">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} style={{ textAlign: "left" }}>
            <Link component={RouterLink} to={LEGAL_CONTACT_PATH} color="inherit">
              {this.props.intl.formatMessage({ id: "legal.legal" })}
            </Link>
            &nbsp;&#9679;&nbsp;
            <Link component={RouterLink} to={LEGAL_PRIVACY_POLICY_PATH} color="inherit">
              {this.props.intl.formatMessage({ id: "legal.privacy" })}
            </Link>
            &nbsp;&#9679;&nbsp;
            <Link component={RouterLink} to={ACCESSIBILITY_PATH} color="inherit">
              {this.props.intl.formatMessage({ id: "legal.accessibility" })}
            </Link>
            {/* &nbsp;&#9679;&nbsp; */}
            {/* <a href="#"> Terms of Service </a> */}
            <br />
            <br />
            <span>&copy; 2020 Factibly. All rights reserved.</span>
          </Grid>
          <Grid item xs={12} sm={3} style={{ textAlign: "left" }}>
            <small>
              {this.props.intl.formatMessage(
                {
                  id: "app.recaptcha.branding",
                },
                {
                  pp: (
                    <RecaptchaLegalLink
                      key="rc-pp-link"
                      nameId="app.recaptcha.privacyPolicy"
                      href={`https://policies.google.com/privacy?hl=${this.props.locale}`}
                    />
                  ),
                  tos: (
                    <RecaptchaLegalLink
                      key="rc-tos-link"
                      nameId="app.recaptcha.serviceTerms"
                      href={`https://policies.google.com/terms?hl=${this.props.locale}`}
                    />
                  ),
                }
              )}
            </small>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ locale: state.settingsReducer.locale });

export default connect(mapStateToProps)(injectIntl(Footer));
