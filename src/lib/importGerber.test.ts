import { describe, expect, it } from "vitest";
import { parseGerberFile, parseExcellonFile, detectLayerByFilenameAndContent } from "./importGerber";

describe("Gerber & Excellon Import Parsing", () => {
  it("parses RS-274X tracks and pads correctly", () => {
    const gerberContent = `
%MOMM*%
%FSLAX34Y34*%
%ADD10C,1.5*%
%ADD11R,2.0X1.0*%
D10*
X100000Y200000D03*
X300000Y400000D02*
X500000Y600000D01*
M02*
`;
    const result = parseGerberFile(gerberContent, "top_copper");
    expect(result.pads).toHaveLength(1);
    expect(result.pads[0].x).toBe(10);
    expect(result.pads[0].y).toBe(20);
    expect(result.pads[0].width).toBe(1.5);
    expect(result.pads[0].shape).toBe("circle");

    expect(result.tracks).toHaveLength(1);
    expect(result.tracks[0].points).toHaveLength(2);
    expect(result.tracks[0].points[0]).toEqual({ x: 30, y: 40 });
    expect(result.tracks[0].points[1]).toEqual({ x: 50, y: 60 });
  });

  it("parses Excellon drill files correctly", () => {
    const excellonContent = `
M48
METRIC
T01C0.8
T02C1.2
%
T01
X10.0Y20.0
X15.0Y25.0
T02
X30.0Y40.0
M30
`;
    const vias = parseExcellonFile(excellonContent);
    expect(vias).toHaveLength(3);
    expect(vias[0].drill).toBe(0.8);
    expect(vias[0].x).toBe(10);
    expect(vias[0].y).toBe(20);
    expect(vias[2].drill).toBe(1.2);
    expect(vias[2].x).toBe(30);
    expect(vias[2].y).toBe(40);
  });

  it("detects layer types based on filename and content", () => {
    expect(detectLayerByFilenameAndContent("board.GTL", "")).toBe("top_copper");
    expect(detectLayerByFilenameAndContent("board.GBL", "")).toBe("bottom_copper");
    expect(detectLayerByFilenameAndContent("board.GKO", "")).toBe("outline");
    expect(detectLayerByFilenameAndContent("board.GTO", "")).toBe("silkscreen");
    expect(detectLayerByFilenameAndContent("board.DRL", "")).toBe("drill");
  });
});
