import assert from "node:assert/strict";
import { test } from "node:test";
import { type TalkEntry, talksIn } from "./talks.ts";

test("the talks are listed newest first", () => {
  const dates = talksIn("en").map((talk) => talk.date);

  assert.deepEqual(dates, dates.toSorted().toReversed());
});

const slides = "https://slides.example/deck";

test("a talk with a title in each language shows the page's own", () => {
  const talk: TalkEntry = {
    date: "2025-07-03",
    title: { ja: "日本語の題", en: "A title" },
    slides,
  };

  assert.deepEqual(
    [talksIn("ja", [talk])[0].title, talksIn("en", [talk])[0].title],
    ["日本語の題", "A title"],
  );
});

test("a title that exists in one language says so on the other language's page only", () => {
  const talk: TalkEntry = { date: "2024-09-11", title: { name: "One title", lang: "en" }, slides };

  assert.equal(talksIn("ja", [talk])[0].lang, "en");
  assert.equal(talksIn("en", [talk])[0].lang, undefined);
});

test("a talk links to its slides, and to a video and an event only where it has them", () => {
  const title = { name: "A talk", lang: "en" } as const;
  const video = "https://video.example/talk";
  const eventPage = "https://event.example/";
  const labelsOf = (talk: TalkEntry) => talksIn("en", [talk])[0].links.map((link) => link.label);

  assert.deepEqual(labelsOf({ date: "2025-01-01", title, slides }), ["Slides"]);
  assert.deepEqual(labelsOf({ date: "2025-01-01", title, slides, eventPage }), ["Slides", "Event"]);
  assert.deepEqual(labelsOf({ date: "2025-01-01", title, slides, video, eventPage }), [
    "Slides",
    "Video",
    "Event",
  ]);
});
