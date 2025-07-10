import { forwardRef, useCallback, useRef } from "react";
import { Tag, Input, Wrap, WrapItem, Text, Box } from "@chakra-ui/react";
import { X } from "lucide-react";

export const TagInput = ({
  tags = [],
  onTagsChange,
  onAddTag,
  onKeyDown,
  keys = ["Enter"],
}) => {
  const inputRef = useRef(null);

  const addTags = (event, tag) => {
    onAddTag?.(event, tag);
    if (event.defaultPrevented) return;
    onTagsChange?.(event, [...tags, tag]);
  };

  const removeTag = (event, index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onTagsChange?.(event, newTags);
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    const { key, currentTarget } = event;
    const { value, selectionStart, selectionEnd } = currentTarget;

    onKeyDown?.(event, value);
    if (event.defaultPrevented) return;

    if (keys.includes(key) && value) {
      addTags(event, value);
      if (!event.defaultPrevented) currentTarget.value = "";
      event.preventDefault();
    }

    const inputIsClean = selectionStart === 0 && selectionEnd === 0;
    if (key === "Backspace" && tags.length > 0 && inputIsClean) {
      removeTag(event, tags.length - 1);
    }
  };

  return (
    <Wrap alignItems="center">
      {tags.map((tag, i) => {
        return (
          <WrapItem key={i}>
            <Tag.Root py="1">
              <Tag.Label>{tag}</Tag.Label>
              <Tag.EndElement onClick={(e) => removeTag(e, i)}>
                <X size={14} />
              </Tag.EndElement>
            </Tag.Root>
          </WrapItem>
        );
      })}
      <WrapItem flexGrow="1">
        <Input
          ref={inputRef}
          placeholder="Digite e pressione enter"
          variant="flushed"
          onKeyDown={handleKeyDown}
        />
      </WrapItem>
    </Wrap>
  );
};
