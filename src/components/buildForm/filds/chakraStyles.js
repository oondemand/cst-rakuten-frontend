export function createChakraStyles(props) {
  return {
    container: (base) => ({
      ...base,
      outline: "none",
      padding: 0,
      margin: 0,
      height: "24px",
      fontSize: "15px",
    }),

    control: (base) => ({
      display: "flex",
      border: "none",
      outline: "none !important",
      padding: 0,
      height: "36px",
      borderRadius: "0px",
      borderBottom: "1px solid",
      borderBottomColor: "#E2E8F0",
    }),

    input: (base) => ({
      ...base,
      display: "flex",
      outline: "none",
      height: "24px",
      padding: 0,
      margin: 0,
    }),

    menu: (base) => ({
      ...base,
      scrollbarWidth: "thin",
      border: "none",
      outline: "none",
    }),

    menuList: (base) => ({
      ...base,
      scrollbarWidth: "thin",
      backgroundColor: "white",
    }),

    placeholder: (base) => ({
      ...base,
      truncate: true,
      display: "none",
    }),

    indicatorSeparator: (base) => ({
      display: "none",
    }),

    ...props,
  };
}
