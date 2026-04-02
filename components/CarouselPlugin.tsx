"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const banners = [
    { src: `${process.env.__NEXT_BASE_PATH}/banner/2024.png`, alt: "2024 banner" },
    { src: `${process.env.__NEXT_BASE_PATH}/banner/2025.png`, alt: "2025 banner" },
    { src: `${process.env.__NEXT_BASE_PATH}/banner/2026.png`, alt: "2026 banner" },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-[90%] lg:w-[50%] max-w-none"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="relative w-full overflow-hidden">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext />
    </Carousel>
  )
}
