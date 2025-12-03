import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-2BYF7PTG2M";

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
