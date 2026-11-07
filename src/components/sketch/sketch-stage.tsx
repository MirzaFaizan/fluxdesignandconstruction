"use client";

import type { Locale } from "@/i18n/routing";
import {
  clampRoom,
  PLOT_TEMPLATES,
  ROOM_FILL,
  roomLabel,
  roomSizeLabel,
  snapFt,
  type SketchRoom,
  type SketchState,
} from "@/lib/sketch";
import Konva from "konva";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Group, Layer, Line, Rect, Stage, Text, Transformer } from "react-konva";

export type SketchStageHandle = {
  toDataURL: () => string;
  deselect: () => void;
};

type SketchStageProps = {
  locale: Locale;
  state: SketchState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onRoomsChange: (rooms: SketchRoom[]) => void;
};

const STEEL = "#5d6d80";
const WHITE = "#ffffff";

function useStageSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 720, height: 640 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => {
      const next = {
        width: Math.max(320, Math.floor(node.clientWidth)),
        height: Math.max(420, Math.floor(node.clientHeight)),
      };
      setSize(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export const SketchStage = forwardRef<SketchStageHandle, SketchStageProps>(
  function SketchStage(
    { locale, state, selectedId, onSelect, onRoomsChange },
    ref
  ) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const roomRefs = useRef(new Map<string, Konva.Group>());
    const size = useStageSize(wrapRef);
    const plot = PLOT_TEMPLATES[state.plotId];
    const ur = locale === "ur";
    const nameFont = ur ? "Noto Naskh Arabic" : "IBM Plex Sans";

    const layout = useMemo(() => {
      const padX = 56;
      const padTop = 36;
      const padBottom = 52;
      const scale = Math.min(
        (size.width - padX * 2) / plot.widthFt,
        (size.height - padTop - padBottom) / plot.depthFt
      );
      const plotW = plot.widthFt * scale;
      const plotH = plot.depthFt * scale;
      const originX = (size.width - plotW) / 2;
      const originY = padTop + (size.height - padTop - padBottom - plotH) / 2;
      return { scale, plotW, plotH, originX, originY };
    }, [size.height, size.width, plot.depthFt, plot.widthFt]);

    useEffect(() => {
      const transformer = trRef.current;
      if (!transformer) return;
      const node = selectedId ? roomRefs.current.get(selectedId) : undefined;
      transformer.nodes(node ? [node] : []);
      transformer.getLayer()?.batchDraw();
    }, [selectedId, state.rooms, layout.scale]);

    useImperativeHandle(ref, () => ({
      toDataURL: () => {
        trRef.current?.nodes([]);
        trRef.current?.getLayer()?.batchDraw();
        return (
          stageRef.current?.toDataURL({
            pixelRatio: 2,
            mimeType: "image/png",
          }) ?? ""
        );
      },
      deselect: () => onSelect(null),
    }));

    const gridLines = useMemo(() => {
      const lines: { points: number[]; major: boolean }[] = [];
      for (let x = 0; x <= plot.widthFt; x += 1) {
        lines.push({
          points: [x * layout.scale, 0, x * layout.scale, layout.plotH],
          major: x % 5 === 0,
        });
      }
      for (let y = 0; y <= plot.depthFt; y += 1) {
        lines.push({
          points: [0, y * layout.scale, layout.plotW, y * layout.scale],
          major: y % 5 === 0,
        });
      }
      return lines;
    }, [layout.plotH, layout.plotW, layout.scale, plot.depthFt, plot.widthFt]);

    const setback = plot.setback;
    const setbackX = setback.side * layout.scale;
    const setbackY = setback.rear * layout.scale;
    const setbackW = Math.max(
      0,
      layout.plotW - setback.side * 2 * layout.scale
    );
    const setbackH = Math.max(
      0,
      layout.plotH - (setback.front + setback.rear) * layout.scale
    );

    function commitRoom(id: string, next: Partial<SketchRoom>) {
      onRoomsChange(
        state.rooms.map((room) =>
          room.id === id ? clampRoom({ ...room, ...next }, plot) : room
        )
      );
    }

    return (
      <div
        ref={wrapRef}
        dir="ltr"
        className="relative h-[min(70vh,720px)] min-h-[420px] w-full overflow-hidden border border-border bg-background"
      >
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          onMouseDown={(event) => {
            if (event.target === event.target.getStage()) onSelect(null);
          }}
          onTap={(event) => {
            if (event.target === event.target.getStage()) onSelect(null);
          }}
        >
          <Layer>
            {gridLines.map((line, index) => (
              <Line
                key={`g-${index}`}
                x={layout.originX}
                y={layout.originY}
                points={line.points}
                stroke={STEEL}
                strokeWidth={line.major ? 1 : 0.5}
                opacity={line.major ? 0.45 : 0.18}
                listening={false}
              />
            ))}

            <Rect
              x={layout.originX}
              y={layout.originY}
              width={layout.plotW}
              height={layout.plotH}
              stroke={WHITE}
              strokeWidth={2}
              fill="rgba(255,255,255,0.04)"
              onMouseDown={() => onSelect(null)}
              onTap={() => onSelect(null)}
            />

            {setbackW > 0 && setbackH > 0 ? (
              <Rect
                x={layout.originX + setbackX}
                y={layout.originY + setbackY}
                width={setbackW}
                height={setbackH}
                stroke={STEEL}
                strokeWidth={1}
                dash={[6, 4]}
                listening={false}
              />
            ) : null}

            <Text
              x={layout.originX}
              y={layout.originY - 22}
              width={layout.plotW}
              align="center"
              text={`${plot.widthFt}'`}
              fontFamily="IBM Plex Sans"
              fontSize={12}
              fill={WHITE}
              listening={false}
            />
            <Text
              x={layout.originX - 46}
              y={layout.originY + layout.plotH / 2 - 8}
              width={40}
              align="right"
              text={`${plot.depthFt}'`}
              fontFamily="IBM Plex Sans"
              fontSize={12}
              fill={WHITE}
              listening={false}
            />
            <Text
              x={layout.originX}
              y={layout.originY + layout.plotH + 10}
              width={layout.plotW}
              align="center"
              text={ur ? "سامنے / سڑک" : "Front / road"}
              fontFamily={nameFont}
              fontSize={13}
              fill={WHITE}
              direction={ur ? "rtl" : "ltr"}
              listening={false}
            />
            <Text
              x={layout.originX + setbackX}
              y={layout.originY + setbackY + 4}
              width={Math.max(40, setbackW - 8)}
              align="left"
              text={ur ? "اشاریہ سیٹ بیک" : "Indicative setback"}
              fontFamily={nameFont}
              fontSize={11}
              fill={STEEL}
              direction={ur ? "rtl" : "ltr"}
              listening={false}
            />

            {state.rooms.map((room) => {
              const w = room.w * layout.scale;
              const h = room.h * layout.scale;
              const dashed = room.type === "porch" || room.type === "courtyard";
              return (
                <Group
                  key={room.id}
                  id={room.id}
                  x={layout.originX + room.x * layout.scale}
                  y={layout.originY + room.y * layout.scale}
                  width={w}
                  height={h}
                  draggable
                  ref={(node) => {
                    if (node) roomRefs.current.set(room.id, node);
                    else roomRefs.current.delete(room.id);
                  }}
                  dragBoundFunc={(pos) => {
                    const minX = layout.originX;
                    const minY = layout.originY;
                    const maxX = layout.originX + layout.plotW - w;
                    const maxY = layout.originY + layout.plotH - h;
                    const x = Math.min(maxX, Math.max(minX, pos.x));
                    const y = Math.min(maxY, Math.max(minY, pos.y));
                    return {
                      x:
                        layout.originX +
                        snapFt((x - layout.originX) / layout.scale) *
                          layout.scale,
                      y:
                        layout.originY +
                        snapFt((y - layout.originY) / layout.scale) *
                          layout.scale,
                    };
                  }}
                  onClick={() => onSelect(room.id)}
                  onTap={() => onSelect(room.id)}
                  onDragEnd={(event) => {
                    const node = event.target;
                    commitRoom(room.id, {
                      x: (node.x() - layout.originX) / layout.scale,
                      y: (node.y() - layout.originY) / layout.scale,
                    });
                  }}
                  onTransformEnd={(event) => {
                    const node = event.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    commitRoom(room.id, {
                      x: (node.x() - layout.originX) / layout.scale,
                      y: (node.y() - layout.originY) / layout.scale,
                      w: (node.width() * scaleX) / layout.scale,
                      h: (node.height() * scaleY) / layout.scale,
                    });
                  }}
                >
                  <Rect
                    width={w}
                    height={h}
                    fill={ROOM_FILL[room.type]}
                    opacity={room.type === "courtyard" ? 0.35 : 0.92}
                    stroke={WHITE}
                    strokeWidth={selectedId === room.id ? 2 : 1}
                    dash={dashed ? [6, 4] : undefined}
                  />
                  <Text
                    x={ur ? 6 : 6}
                    y={6}
                    width={Math.max(20, w - 12)}
                    text={roomLabel(room.type, locale)}
                    fontFamily={nameFont}
                    fontSize={Math.min(14, Math.max(11, w / 8))}
                    fill={WHITE}
                    direction={ur ? "rtl" : "ltr"}
                    align={ur ? "right" : "left"}
                    listening={false}
                  />
                  <Text
                    x={6}
                    y={24}
                    width={Math.max(20, w - 12)}
                    text={roomSizeLabel(room)}
                    fontFamily="IBM Plex Sans"
                    fontSize={11}
                    fill={WHITE}
                    listening={false}
                  />
                </Group>
              );
            })}

            <Transformer
              ref={trRef}
              rotateEnabled={false}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
                "middle-left",
                "middle-right",
                "top-center",
                "bottom-center",
              ]}
              boundBoxFunc={(oldBox, newBox) => {
                const min = 4 * layout.scale;
                if (newBox.width < min || newBox.height < min) return oldBox;
                const maxX = layout.originX + layout.plotW;
                const maxY = layout.originY + layout.plotH;
                if (newBox.x < layout.originX || newBox.y < layout.originY) {
                  return oldBox;
                }
                if (
                  newBox.x + newBox.width > maxX ||
                  newBox.y + newBox.height > maxY
                ) {
                  return oldBox;
                }
                return newBox;
              }}
              anchorFill={WHITE}
              anchorStroke={STEEL}
              borderStroke={WHITE}
            />
          </Layer>
        </Stage>
        <p className="pointer-events-none absolute start-3 top-3 text-[0.6875rem] tracking-[0.08em] text-foreground/70">
          1 sq = 1 ft
        </p>
      </div>
    );
  }
);
