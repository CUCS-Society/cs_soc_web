"use client"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import Image from "next/image"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const banners = [
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}/doc/48th_2026/banner.png`,
      alt: "2026 banner",
    },
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-none"
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

                    width={800}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
