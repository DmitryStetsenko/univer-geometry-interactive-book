/**
 * TypeScript types for the Geometry Textbook Topics.
 * Defined inside the Topic entity domain of FSD architecture.
 */

export interface VisualStep {
  /** Short title of the visual step */
  title: string;
  /** Comprehensive explanation of what is shown in this step */
  description: string;
  /** Relative URL to the compiled SVG asset */
  svgPath: string;
  /** Relative URL or text content of the Asymptote source file */
  asyPath?: string;
  /** Raw Asymptote code snippet (for rendering in the UI) */
  asyCode?: string;
}

export interface Topic {
  /** Unique identifier / slug used in routes (e.g. 'pythagorean-theorem') */
  id: string;
  /** Human-readable title of the topic */
  title: string;
  /** Name of the chapter/section this topic belongs to */
  chapter: string;
  /** Short description/summary of the topic */
  description: string;
  /** Theoretical text, split into paragraphs */
  theory: string[];
  /** Sequence of interactive/visual steps using Asymptote graphics */
  steps?: VisualStep[];
}

export interface Chapter {
  /** Chapter title */
  title: string;
  /** List of topic headers in this chapter for quick navigation */
  topics: {
    id: string;
    title: string;
  }[];
}
