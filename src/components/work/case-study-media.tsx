"use client";

import { Still } from "@/components/media/still";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComparePair } from "@/components/work/compare-pair";
import { workTransitionName } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { ViewTransition } from "react";
import { useEffect, useState } from "react";

export type CaseStudyStill = {
  src: StaticImageData;
  alt: string;
  caption: string;
  kind: "cgi" | "site" | "interior" | "3d" | "elevation" | "landscape";
};

export type CaseStudyMediaCopy = {
  galleryIntro: string;
  label3d: string;
  labelElevation: string;
  labelDesign: string;
  labelSite: string;
  cgiNote: string;
  compareIntro: string;
  compareAria: string;
  lightboxClose: string;
  lightboxNext: string;
  lightboxPrev: string;
};

function kindLabel(kind: CaseStudyStill["kind"], copy: CaseStudyMediaCopy) {
  if (kind === "3d" || kind === "cgi") return copy.label3d;
  if (kind === "elevation") return copy.labelElevation;
  return null;
}

export function CaseStudyMedia({
  slug,
  items,
  compare,
  copy,
}: {
  slug: string;
  items: CaseStudyStill[];
  compare?: {
    cgi: StaticImageData;
    site: StaticImageData;
    cgiAlt: string;
    siteAlt: string;
  };
  copy: CaseStudyMediaCopy;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const hero = items[0];
  const rest = items.slice(1);
  const current = items[index];

  function openAt(next: number) {
    setIndex(next);
    setOpen(true);
  }

  function step(delta: number) {
    setIndex((currentIndex) => {
      const length = items.length;
      return (currentIndex + delta + length) % length;
    });
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  if (!hero) return null;

  return (
    <>
      <div className="relative">
        <ViewTransition
          name={workTransitionName(slug)}
          default="none"
          share="morph"
        >
          <Still
            src={hero.src}
            alt={hero.alt}
            priority
            sizes="100vw"
            className="aspect-[16/9] md:aspect-[16/7]"
            caption={hero.caption}
          />
        </ViewTransition>
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute inset-0"
          aria-label={hero.caption}
        />
      </div>

      {compare ? (
        <section className="mt-16">
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/85">
            {copy.compareIntro}
          </p>
          <div className="mt-8">
            <ComparePair
              cgi={compare.cgi}
              site={compare.site}
              cgiAlt={compare.cgiAlt}
              siteAlt={compare.siteAlt}
              labelDesign={copy.labelDesign}
              labelSite={copy.labelSite}
              cgiNote={copy.cgiNote}
              ariaLabel={copy.compareAria}
            />
          </div>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl">
            {copy.galleryIntro}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {rest.map((item, restIndex) => {
              const label = kindLabel(item.kind, copy);
              return (
                <div key={`${item.alt}-${restIndex}`} className="relative">
                  <Still
                    src={item.src}
                    alt={item.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[16/10]"
                    caption={
                      <span className="flex flex-col gap-1">
                        {label ? (
                          <span className="nav-link text-foreground/80">
                            {label}
                          </span>
                        ) : null}
                        <span>{item.caption}</span>
                      </span>
                    }
                  />
                  <button
                    type="button"
                    onClick={() => openAt(restIndex + 1)}
                    className="absolute inset-0"
                    aria-label={item.caption}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-background/90 supports-backdrop-filter:backdrop-blur-none" />
          <DialogPrimitive.Popup
            className={cn(
              "fixed inset-0 z-50 flex h-dvh w-full max-w-none translate-none flex-col bg-transparent p-0 text-foreground outline-none ring-0"
            )}
          >
            <DialogTitle className="sr-only">{current?.caption}</DialogTitle>
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="min-w-0 flex-1 text-sm leading-7 text-foreground">
                {current?.caption}
              </p>
              <DialogClose
                className="inline-flex size-11 items-center justify-center border border-border text-foreground hover:bg-foreground hover:text-background"
                aria-label={copy.lightboxClose}
              >
                <XIcon className="size-4" />
              </DialogClose>
            </div>
            <div className="relative min-h-0 flex-1">
              {current ? (
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-contain"
                />
              ) : null}
              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute start-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground hover:bg-foreground hover:text-background"
                    aria-label={copy.lightboxPrev}
                  >
                    <ChevronLeft className="size-4 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute end-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground hover:bg-foreground hover:text-background"
                    aria-label={copy.lightboxNext}
                  >
                    <ChevronRight className="size-4 rtl:rotate-180" />
                  </button>
                </>
              ) : null}
            </div>
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>
    </>
  );
}
