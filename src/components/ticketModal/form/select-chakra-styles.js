export const chakraStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "white",
    scrollbarWidth: "thin",
    fontWeight: "normal",
    border: "none",
    borderBottom: "1px solid",
    borderBottomColor: "gray.200",
    outline: "none",
    focusRingColor: "transparent",
    fontSize: "sm",
    rounded: "none",
  }),
  menu: (base) => ({
    ...base,
    scrollbarWidth: "thin",
    fontWeight: "normal",
    fontSize: "sm",
  }),

  loadingIndicator: (base) => ({
    ...base,
    width: "10px",
    height: "10px",
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: "thin",
    fontWeight: "normal",
    fontSize: "sm",
  }),
  placeholder: (base) => ({
    ...base,
    color: "gray.400",
    fontWeight: "normal",
  }),
};
