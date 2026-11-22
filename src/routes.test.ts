import assert from "node:assert/strict";
import { test } from "node:test";
import { otherLanguage, pathOf } from "./routes.ts";

test("the English top page is the root, and the Japanese one is /ja/", () => {
  assert.equal(pathOf("en", "top"), "/");
  assert.equal(pathOf("ja", "top"), "/ja/");
});

test("a page's path ends with a slash in both languages", () => {
  assert.equal(pathOf("en", "career"), "/career/");
  assert.equal(pathOf("ja", "career"), "/ja/career/");
});

test("each language's other language is the other of the two", () => {
  assert.equal(otherLanguage("en"), "ja");
  assert.equal(otherLanguage("ja"), "en");
});
