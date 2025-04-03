export const autoCompleteSelectInputStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "white",
    scrollbarWidth: "thin",
    borderBottomColor: "gray.200",
    outline: "none",
    focusRingColor: "transparent",
    fontSize: "12px",
  }),
  menu: (base) => ({
    ...base,
    scrollbarWidth: "thin",
    fontSize: "12px",
  }),
  loadingIndicator: (base) => ({
    ...base,
    width: "10px",
    height: "10px",
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: "thin",
    fontSize: "12px",
  }),
  placeholder: (base) => ({
    ...base,
    truncate: true,
    fontSize: "12px",
    fontWeight: "normal",
  }),
};
