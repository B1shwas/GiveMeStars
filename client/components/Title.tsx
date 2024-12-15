import { TTitleProps } from "@/lib/type";
import Link from "next/link";

const Title = (props: TTitleProps) => {
  const { title, subtitle, link } = props;
  return (
    <div className="flex justify-between mb-5">
      <div>
        <h4 className="text-main2 md:text-title leading-tight">{title}</h4>
        <p className="text-greyish text-sub2 md:text-subtitle">{subtitle}</p>
      </div>
      {link && (
        <Link href={link} className="text-link text-prim">
          See All
        </Link>
      )}
    </div>
  );
};

export default Title;
