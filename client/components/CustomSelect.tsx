import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CustomSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full h-[50px] bg-light text-greyish/60 pl-5 py-0">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Teacher</SelectItem>
        <SelectItem value="dark">School</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
