"use client";

import { DownloadDialog } from "@/components/sketch/download-dialog";
import {
  SketchStage,
  type SketchStageHandle,
} from "@/components/sketch/sketch-stage";
import type { Locale } from "@/i18n/routing";
import { ctaChip, ctaPrimary, ctaSecondary } from "@/lib/cta";
import {
  clampRoom,
  emptySketch,
  encodeSketch,
  indicativeCovered,
  loadSketch,
  PLOT_ORDER,
  PLOT_TEMPLATES,
  placeRoom,
  plotFamilyLabel,
  plotFeetLabel,
  ROOM_TYPES,
  roomLabel,
  roomsArea,
  rotateRoom,
  saveSketch,
  sharePath,
  sketchWhatsAppText,
  decodeSketch,
  type PlotId,
  type RoomType,
  type SimilarSketchProject,
  type SketchPdfCopy,
  type SketchRoom,
  type SketchState,
} from "@/lib/sketch";
import type { SketchLeadFormValues } from "@/lib/sketch-schema";
import { cn } from "@/lib/utils";
import { whatsappUrlWithText } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type HouseSketchProps = {
  locale: Locale;
  similar: Record<"5marla" | "10marla" | "1kanal", SimilarSketchProject>;
};

function readInitialSketch(): SketchState {
  if (typeof window === "undefined") return emptySketch();
  const shared = new URLSearchParams(window.location.search).get("s");
  if (shared) {
    const decoded = decodeSketch(shared);
    if (decoded) return decoded;
  }
  return loadSketch() ?? emptySketch();
}

export function HouseSketch({ locale, similar }: HouseSketchProps) {
  const t = useTranslations("Sketch");
  const stageRef = useRef<SketchStageHandle>(null);
  const [state, setState] = useState<SketchState>(readInitialSketch);
  const [past, setPast] = useState<SketchState[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [needRooms, setNeedRooms] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [gateStatus, setGateStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);

  const plot = PLOT_TEMPLATES[state.plotId];
  const selected = state.rooms.find((room) => room.id === selectedId) ?? null;
  const roomSq = roomsArea(state.rooms);
  const covered = indicativeCovered(state.rooms);

  const push = useCallback((next: SketchState) => {
    setPast((history) => [...history.slice(-49), state]);
    setState(next);
  }, [state]);

  useEffect(() => {
    saveSketch(state);
  }, [state]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedId) {
          event.preventDefault();
          removeSelected();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- undo/remove close over latest state
  }, [selectedId, state, past]);

  function undo() {
    setPast((history) => {
      if (history.length === 0) return history;
      const previous = history[history.length - 1];
      setState(previous);
      setSelectedId(null);
      return history.slice(0, -1);
    });
  }

  function setPlot(plotId: PlotId) {
    if (plotId === state.plotId) return;
    const nextPlot = PLOT_TEMPLATES[plotId];
    push({
      ...state,
      plotId,
      rooms: state.rooms.map((room) => clampRoom(room, nextPlot)),
    });
    setSelectedId(null);
  }

  function addRoom(type: RoomType) {
    const room = placeRoom(type, state.rooms, plot);
    push({ ...state, rooms: [...state.rooms, room] });
    setSelectedId(room.id);
    setNeedRooms(false);
  }

  function setRooms(rooms: SketchRoom[]) {
    push({ ...state, rooms });
  }

  function removeSelected() {
    if (!selectedId) return;
    push({
      ...state,
      rooms: state.rooms.filter((room) => room.id !== selectedId),
    });
    setSelectedId(null);
  }

  function updateSelected(patch: Partial<SketchRoom>) {
    if (!selected) return;
    push({
      ...state,
      rooms: state.rooms.map((room) =>
        room.id === selected.id ? clampRoom({ ...room, ...patch }, plot) : room
      ),
    });
  }

  const pdfCopy = useMemo<SketchPdfCopy>(
    () => ({
      studio: t("pdfStudio"),
      packTitle: t("pdfTitle"),
      dateLabel: t("pdfDate"),
      sketchIdLabel: t("pdfId"),
      societyLabel: t("pdfSociety"),
      frontLabel: t("pdfFront"),
      disclaimer: t("disclaimer"),
      scheduleTitle: t("pdfSchedule"),
      colRoom: t("colRoom"),
      colSize: t("colSize"),
      colArea: t("colArea"),
      plotArea: t("pdfPlotArea"),
      roomsArea: t("pdfRoomsArea"),
      covered: t("pdfCovered"),
      coveredNote: t("pdfCoveredNote"),
      storey: t("pdfStorey"),
      education5: t("education5"),
      similarTitle: t("pdfSimilar"),
      nextTitle: t("pdfNextTitle"),
      nextBody: t("pdfNextBody"),
      approvalsLine: t("pdfApprovals"),
      whatsappLine: t("pdfWhatsapp"),
    }),
    [t]
  );

  async function onSubmitLead(values: SketchLeadFormValues) {
    setGateStatus("sending");
    const nextState: SketchState = {
      ...state,
      society: values.society.trim() || state.society,
    };
    setState(nextState);
    stageRef.current?.deselect();
    setSelectedId(null);

    try {
      const response = await fetch("/api/sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          sketchId: nextState.id,
          plotId: nextState.plotId,
          rooms: nextState.rooms,
        }),
      });
      if (!response.ok) {
        setGateStatus("error");
        return;
      }

      const encoded = encodeSketch(nextState);
      const path = sharePath(locale, encoded);
      const url = `${window.location.origin}${path}`;
      setShareUrl(url);
      setWhatsappHref(whatsappUrlWithText(sketchWhatsAppText(locale, nextState)));

      const planDataUrl = stageRef.current?.toDataURL() ?? "";
      const { downloadSketchPdf } = await import("@/lib/sketch-pdf");
      await downloadSketchPdf({
        locale,
        state: nextState,
        planDataUrl,
        similar: similar[plot.family],
        copy: pdfCopy,
        shareUrl: url,
      });
      setGateStatus("sent");
    } catch {
      setGateStatus("error");
    }
  }

  function openGate() {
    if (state.rooms.length === 0) {
      setNeedRooms(true);
      return;
    }
    setNeedRooms(false);
    setGateStatus("idle");
    setShareUrl(null);
    setWhatsappHref(null);
    setGateOpen(true);
  }

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)] lg:items-start">
      <aside className="flex flex-col gap-6">
        <div>
          <p className="nav-link text-foreground/70">{t("plotEyebrow")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLOT_ORDER.map((id) => {
              const template = PLOT_TEMPLATES[id];
              const active = id === state.plotId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPlot(id)}
                  className={cn(ctaChip, active && "bg-foreground text-background")}
                  aria-pressed={active}
                >
                  {plotFamilyLabel(template, locale)}
                  {" · "}
                  <span dir="ltr">{plotFeetLabel(template)}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/75">
            {t("plotNote")}
          </p>
        </div>

        <div>
          <label htmlFor="sketch-society-live" className="text-sm font-medium">
            {t("fieldSociety")}
          </label>
          <input
            id="sketch-society-live"
            value={state.society}
            onChange={(event) =>
              setState((current) => ({ ...current, society: event.target.value }))
            }
            placeholder={t("phSociety")}
            className="mt-2 min-h-11 w-full rounded-[2px] border border-border bg-transparent px-3 text-sm outline-none placeholder:text-foreground/45"
          />
        </div>

        <div>
          <p className="nav-link text-foreground/70">{t("roomsEyebrow")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROOM_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addRoom(type)}
                className={ctaChip}
              >
                {roomLabel(type, locale)}
              </button>
            ))}
          </div>
        </div>

        {selected ? (
          <div className="border border-border p-4">
            <p className="text-sm font-medium">{roomLabel(selected.type, locale)}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-sm">
                {t("width")}
                <input
                  dir="ltr"
                  type="number"
                  min={4}
                  max={plot.widthFt}
                  value={selected.w}
                  onChange={(event) =>
                    updateSelected({ w: Number(event.target.value) })
                  }
                  className="mt-1 min-h-11 w-full rounded-[2px] border border-border bg-transparent px-3 text-sm"
                />
              </label>
              <label className="text-sm">
                {t("depth")}
                <input
                  dir="ltr"
                  type="number"
                  min={4}
                  max={plot.depthFt}
                  value={selected.h}
                  onChange={(event) =>
                    updateSelected({ h: Number(event.target.value) })
                  }
                  className="mt-1 min-h-11 w-full rounded-[2px] border border-border bg-transparent px-3 text-sm"
                />
              </label>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={ctaSecondary}
                onClick={() =>
                  push({
                    ...state,
                    rooms: state.rooms.map((room) =>
                      room.id === selected.id ? rotateRoom(room, plot) : room
                    ),
                  })
                }
              >
                {t("rotate")}
              </button>
              <button type="button" className={ctaSecondary} onClick={removeSelected}>
                {t("remove")}
              </button>
            </div>
          </div>
        ) : null}

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-foreground/70">{t("livePlot")}</dt>
            <dd dir="ltr" className="mt-1 font-medium">
              {plot.areaSqFt} sq ft
            </dd>
          </div>
          <div>
            <dt className="text-foreground/70">{t("liveRooms")}</dt>
            <dd dir="ltr" className="mt-1 font-medium">
              {roomSq} sq ft
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-foreground/70">{t("liveCovered")}</dt>
            <dd dir="ltr" className="mt-1 font-medium">
              {covered} sq ft
            </dd>
            <p className="mt-1 text-pretty text-xs text-foreground/70">
              {t("pdfCoveredNote")}
            </p>
          </div>
        </dl>

        {plot.family === "5marla" ? (
          <p className="text-pretty text-sm leading-relaxed text-foreground/80">
            {t("education5")}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={ctaSecondary}
            onClick={undo}
            disabled={past.length === 0}
          >
            {t("undo")}
          </button>
          {state.rooms.length >= 2 ? (
            <p className="text-sm text-foreground/75">{t("savedOnPhone")}</p>
          ) : null}
        </div>

        {needRooms ? (
          <p role="alert" className="text-sm">
            {t("needRooms")}
          </p>
        ) : null}

        <button type="button" className={ctaPrimary} onClick={openGate}>
          {t("download")}
        </button>
      </aside>

      <div>
        <SketchStage
          ref={stageRef}
          locale={locale}
          state={state}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onRoomsChange={setRooms}
        />
        <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/75">
          {t("canvasHint")}
        </p>
      </div>

      <DownloadDialog
        locale={locale}
        open={gateOpen}
        onOpenChange={setGateOpen}
        society={state.society}
        status={gateStatus}
        shareUrl={shareUrl}
        whatsappHref={whatsappHref}
        onSubmitLead={onSubmitLead}
      />
    </div>
  );
}
