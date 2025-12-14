import { Search } from "@tamagui/lucide-icons";
import React from "react";
import { Button, Input, Spinner, XStack } from "tamagui";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
  loading?: boolean;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = "Search...",
}) => {
  return (
    <XStack
      ai="center"
      jc="space-between"
      h={50}
      px="$3"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      bg="$background"
      gap="$2"
      m="$3"
    >
      <Input
        flex={1}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        borderWidth={0}
        h="100%"
        p="$2"
        radius="$4"
      />
      <Button
        onPress={onSearch}
        size="$3"
        circular
        icon={loading ? () => <Spinner size="small" /> : Search}
        color="#1D61E7"
      />
    </XStack>
  );
};
