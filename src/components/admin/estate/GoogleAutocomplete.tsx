import React, { useEffect, useRef, useState } from 'react';

export function GoogleAutocomplete({
  onSelect,
  initialValue,
}: {
  onSelect: (location: {
    lat: number;
    lng: number;
    fullAddress?: string;
  }) => void;
  initialValue?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(initialValue || '');

  useEffect(() => {
    setInputValue(initialValue || '');
  }, [initialValue]);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['geocode'],
        componentRestrictions: { country: 'lv' },
      },
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;

      if (!location) return;

      onSelect({
        lat: location.lat(),
        lng: location.lng(),
        fullAddress: place.formatted_address,
      });
    });
  }, []);

  return (
    <input
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search address..."
      className="shadow appearance-none border w-full py-2 px-3
                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
}
