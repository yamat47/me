import assert from "node:assert/strict";
import { test } from "node:test";
import { articlesIn } from "./writing.ts";

const post = { date: "2025-02-13", href: "https://blog.example/entry/a", title: "ブログの記事" };
const elsewhere = [
  { date: "2025-03-01", href: "https://other.example/later", title: "あとの記事" },
  { date: "2023-12-18", href: "https://other.example/earlier", title: "まえの記事" },
];

test("the blog's posts and the articles elsewhere are one list, newest first", () => {
  assert.deepEqual(
    articlesIn("ja", [post], elsewhere).map((article) => article.title),
    ["あとの記事", "ブログの記事", "まえの記事"],
  );
});

test("an English page is told that the titles are Japanese, and a Japanese page is not", () => {
  assert.deepEqual(
    articlesIn("en", [post], elsewhere).map((article) => article.lang),
    ["ja", "ja", "ja"],
  );
  assert.deepEqual(
    articlesIn("ja", [post], elsewhere).map((article) => article.lang),
    [undefined, undefined, undefined],
  );
});
