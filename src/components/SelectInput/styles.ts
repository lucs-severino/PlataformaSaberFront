import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.FONT_SIZES.sm};
  color: ${({ theme }) => theme.COLORS.inputColor};
  margin-left: 3px;
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectTrigger = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.inputBackground};
  color: ${({ theme }) => theme.COLORS.inputColor};
  border: 1px solid ${({ theme }) => theme.COLORS.inputBorderColor};
  outline: none;
  padding: 10px 13px;
  box-sizing: border-box;
  transition: all 0.3s;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.COLORS.inputBorderColorFocus};
    outline: none;
  }

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-image: ${({ theme }) => {
      const arrowColor = encodeURIComponent(theme.COLORS.inputColor);
      return `url('data:image/svg+xml;utf8,<svg fill="${arrowColor}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`;
    }};
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s;
  }
`;

export const OptionsList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 4px;
  margin: 5px 0 0 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.inputBackground};
  border: 1px solid ${({ theme }) => theme.COLORS.inputBorderColorFocus};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999; /* 🔑 sempre acima */

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

export const OptionItem = styled.li`
  padding: 10px 13px;
  color: ${({ theme }) => theme.COLORS.inputColor};
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.primaryHover};
    color: ${({ theme }) => theme.COLORS.white};
  }
`;
