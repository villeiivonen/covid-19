import styled from "styled-components";

export const MainContainer = styled.div`
  width: auto;
  max-width: 640px;
  margin: 0 auto;
  padding: 2em;
`;
export const StyledHeading = styled.h1`
  font-family: "Lato";
  font-size: 2em;
  text-align: center;
  color: #fff;
  margin-bottom: 1em;
`;
export const SelectContainer = styled.div`
  margin-bottom: 1.4em;
`;
export const StyledAge = styled.h1`
  font-family: "Lato";
  font-size: 1.8em;
  text-align: center;
  color: #fff;
  margin-bottom: 0.6em;
`;
export const SliderContainer = styled.div`
  margin-bottom: 1.6em;
`;
export const RadioButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3em;
`;
export const RadioWrapper = styled.div`
  display: inline-block;
`;
export const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 2px solid #fff;
  width: 28px;
  height: 28px;
  left: 0;
  top: -4px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #fb695e;
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 110ms;
  }
`;
export const StyledResulText = styled.h1`
  font-family: "Lato";
  font-size: 1.2em;
  text-align: center;
  color: #fff;
  margin-bottom: 0.5em;
  line-height: 1.4em;
`;
export const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 28px;
      height: 28px;
      opacity: 1;
      left: 0;
      top: 0;
    }
  }
`;
export const Label = styled.label`
  position: relative;
  font-family: "Lato";
  color: #fff;
  font-size: 1.8em;
  margin-right: 0.5em;
  margin-left: 0.5em;
`;
export const UnderLine = styled.span`
  text-decoration: underline;
`;

export const StyledDisclaimer = styled.div`
  margin-top: 3em;
`;
export const DisclaimerHeading = styled.p`
  font-family: "Montserrat";
  color: #fff;
  font-size: 0.8em;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1em;
`;
export const DisclaimerLink = styled.a`
  font-family: "Montserrat";
  color: #fff;
  font-size: 0.8em;
  font-weight: 300;
  text-align: center;
  margin-bottom: 0.5em;
  display: block;
`;
export const SliderHandleStyle = {
  height: 28,
  width: 28,
  marginLeft: -14,
  marginTop: -14,
  backgroundColor: "#FB695E",
  border: 0
};
export const SliderRailStyle = {
  height: 2
};
export const SliderTrackStyle = {
  background: "#FB695E"
};
export const SelectStyles = {
  control: (base: Record<string, unknown>): Record<string, unknown> => ({
    ...base,
    fontFamily: "Lato",
    fontSize: "1.2em",
    color: "#1B1C1F"
  }),
  menu: (base: Record<string, unknown>): Record<string, unknown> => ({
    ...base,
    fontFamily: "Lato",
    fontSize: "1.2em",
    color: "#1B1C1F"
  })
};
