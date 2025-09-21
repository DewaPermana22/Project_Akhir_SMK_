import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const MultiSelectDropdown = ({
  placeholder = "Pilih opsi",
  options = [],
  selectedValues = [],
  onSelect,
  size = "w-64",
  className = "",
  name,
  disabled = false,
  searchable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOption = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onSelect(newValues);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onSelect([]);
  };

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.id))
    .map((option) => option.label);

  return (
    <div className={cn("relative", size, className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "w-full justify-between h-auto min-h-10 py-2 px-3",
              "border-gray-200 rounded-md",
              isOpen && "ring-1 ring-indigo-700 border-indigo-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1 flex-1 text-left">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-indigo-100 text-indigo-600 hover:bg-blue-200 border-indigo-300"
                  >
                    {label}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
            <div className="flex items-center">
              {selectedLabels.length > 0 && (
                <X
                  className="h-4 w-4 mr-1 text-gray-400 hover:text-gray-600"
                  onClick={clearSelection}
                />
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 transition-transform duration-200",
                  isOpen && "transform rotate-180"
                )}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command>
            {searchable && (
              <CommandInput placeholder="Cari opsi..." className="h-9" />
            )}
            <CommandEmpty className="text-sm text-gray-600 text-center">Tidak ada opsi yang ditemukan</CommandEmpty>
            <ScrollArea className="h-48">
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.id);
                  return (
                    <CommandItem
                      key={option.id}
                      value={option.label}
                      onSelect={() => toggleOption(option.id)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-[var(--blue)] text-white border-[var(--blue)]"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectDropdown;