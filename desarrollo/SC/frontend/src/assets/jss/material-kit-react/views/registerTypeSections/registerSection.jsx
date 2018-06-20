import { title, container } from '../../../material-kit-react';

const registerSectionStyle = {
  section: {
    padding: "70px 0"
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: "#525151",
    textAlign: "center"
  },
  container: {
    zIndex: '1',
    color: '#FFFFFF',
    ...container
  }
}
export default registerSectionStyle;
