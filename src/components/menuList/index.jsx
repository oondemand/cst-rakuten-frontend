import { useVirtualizer } from "@tanstack/react-virtual";
import { Box } from "@chakra-ui/react";
import { forwardRef, useRef } from "react";

export const MenuList = forwardRef(({ children, ...props }, ref) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: children.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const { cx, ...rest } = props;

  return (
    <Box
      {...rest}
      ref={parentRef}
      height="200px"
      overflowY="auto"
      scrollbarWidth="thin"
      background="white"
    >
      <Box
        height={`${virtualizer.getTotalSize()}px`}
        width="100%"
        position="relative"
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <Box
            key={virtualItem.key}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height={`${virtualItem.size}px`}
            transform={`translateY(${virtualItem.start}px)`}
            truncate
          >
            {children[virtualItem.index]}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

MenuList.displayName = "MenuList";
