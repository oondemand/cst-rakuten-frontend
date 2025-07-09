import { forwardRef, useCallback } from "react";
import { Tag, Input, Wrap, WrapItem } from "@chakra-ui/react";
import { X } from "lucide-react";

function maybeCall(maybeFunc, ...args) {
  return typeof maybeFunc === "function" ? maybeFunc(...args) : maybeFunc;
}

const ChakraTagInputTag = ({
  children,
  onRemove,
  tagLabelProps,
  tagCloseButtonProps,
  ...props
}) => {
  const handleClick = (event) => {
    tagCloseButtonProps?.onClick?.(event);
    if (!event.defaultPrevented) {
      onRemove?.(event);
    }
  };

  return (
    <Tag.Root p="1" {...props}>
      <Tag.Label {...tagLabelProps}>{children}</Tag.Label>
      <Tag.CloseTrigger {...tagCloseButtonProps} onClick={handleClick}>
        <X size={14} />
      </Tag.CloseTrigger>
    </Tag.Root>
  );
};

export const ChakraTagInput = forwardRef(
  (
    {
      tags = [],
      onTagsChange,
      onTagAdd,
      onTagRemove,
      vertical = false,
      addKeys = ["Enter"],
      wrapProps,
      wrapItemProps,
      tagProps,
      tagLabelProps,
      tagCloseButtonProps,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const addTag = useCallback(
      (event, tag) => {
        onTagAdd?.(event, tag);
        if (event.defaultPrevented) return;
        onTagsChange?.(event, [...tags, tag]);
      },
      [tags, onTagAdd, onTagsChange]
    );

    const removeTag = useCallback(
      (event, index) => {
        onTagRemove?.(event, index);
        if (event.defaultPrevented) return;
        const newTags = [...tags];
        newTags.splice(index, 1);
        onTagsChange?.(event, newTags);
      },
      [tags, onTagRemove, onTagsChange]
    );

    const handleRemoveTag = (index) => (event) => {
      removeTag(event, index);
    };

    const handleKeyDown = useCallback(
      (event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.isPropagationStopped?.()) return;

        const { key, currentTarget } = event;
        const { value, selectionStart, selectionEnd } = currentTarget;

        if (addKeys.includes(key) && value) {
          addTag(event, value);
          if (!event.defaultPrevented) currentTarget.value = "";
          event.preventDefault();
        } else if (
          key === "Backspace" &&
          tags.length > 0 &&
          selectionStart === 0 &&
          selectionEnd === 0
        ) {
          removeTag(event, tags.length - 1);
        }
      },
      [tags.length, addKeys, addTag, removeTag, onKeyDown]
    );

    return (
      <Wrap
        align="center"
        direction={vertical ? "column" : "row"}
        {...wrapProps}
      >
        {tags.map((tag, index) => (
          <WrapItem key={index} {...maybeCall(wrapItemProps, false, index)}>
            <ChakraTagInputTag
              onRemove={handleRemoveTag(index)}
              tagLabelProps={maybeCall(tagLabelProps, tag, index)}
              tagCloseButtonProps={maybeCall(tagCloseButtonProps, tag, index)}
              colorPalette={props.colorPalette}
              size={props.size}
              {...maybeCall(tagProps, tag, index)}
            >
              {tag}
            </ChakraTagInputTag>
          </WrapItem>
        ))}
        <WrapItem flexGrow={1} {...maybeCall(wrapItemProps, true, tags.length)}>
          <Input {...props} ref={ref} onKeyDown={handleKeyDown} />
        </WrapItem>
      </Wrap>
    );
  }
);
