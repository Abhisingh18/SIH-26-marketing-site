import Image from "next/image";
import flourish from "@/components/photos/flourish-alpha.png";
import { cn } from "@/lib/utils";

/**
 * The hero flourish.
 *
 * The supplied artwork had its checkerboard painted into the pixels — no alpha
 * channel at all — so recolouring it in CSS turned the whole square white. The
 * file is pre-processed instead (see the note in the README): alpha derived from
 * luminance, then cropped to the artwork's bounding box.
 *
 * It ships dark on transparent, which is why there are two variants rather than
 * one: `light` inverts it to white for the saffron dome on the home page, `ink`
 * leaves it dark for the paper backgrounds everywhere else. A white flourish on
 * paper is an invisible flourish.
 */
export function Flourish({
  variant = "light",
  className,
}: {
  variant?: "light" | "ink";
  className?: string;
}) {
  return (
    <Image
      src={flourish}
      alt=""
      priority
      aria-hidden
      className={cn(
        "w-[152px] sm:w-[170px]",
        variant === "light"
          ? "opacity-85 [filter:brightness(0)_invert(1)]"
          : "opacity-25",
        className,
      )}
    />
  );
}
