import { Input } from "@chakra-ui/react";
import { usePlacesWidget } from "react-google-autocomplete";

export const AutoCompleteInput = () => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "br" },
    },
  });

  return (
    <Input
      ref={ref}
      placeholder="Endereço"
      bg={"gray.100"}
      border={0}
      color={"gray.500"}
      _placeholder={{
        color: "gray.500",
      }}
    />
  );
};
