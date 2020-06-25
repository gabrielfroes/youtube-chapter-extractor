import {
  assertEquals,
  assertArrayContains,
  assertStringContains,
} from "https://deno.land/std/testing/asserts.ts";

import { expect } from "https://deno.land/x/expect/expect.ts";

let bestChannel = "Código Fonte TV";
let otherChannel = "Casal CDF";

Deno.test("Best Youtube Channel (NO API)", () => {
  if (bestChannel != "Código Fonte TV") {
    throw new Error(`${bestChannel} is not the best`);
  }
});

Deno.test("Not Best Youtube Channel (NO API)", () => {
  if (otherChannel != "Casal CDF") {
    throw new Error(`${otherChannel} is not the best`);
  }
});

Deno.test("Best Youtube Channel (API)", () => {
  assertEquals(bestChannel, "Código Fonte TV");
  assertStringContains(bestChannel, "Código");
});

let bestChannels = [
  "Código Fonte TV",
  "Diolinux",
  "TekZoom",
  "Rodrigo Branas",
  "Programador BR",
  "Filipe Deschamps",
  "Lucas Montano",
  "Balta.IO",
  "Fabio Akita",
  "Bullas Attekita",
];

Deno.test("Best Youtube Channels (API)", () => {
  assertArrayContains(
    bestChannels,
    ["Código Fonte TV", "Rodrigo Branas"],
    "Some channel are not the best",
  );
});

Deno.test("Best Youtube Channels (EXPECT)", () => {
  expect(bestChannels).toContain("Código Fonte TV");
  expect(bestChannels).not.toContain("Casal CDF");
  expect(bestChannels).toHaveLength(10);
  expect(Promise.resolve("Código Fonte TV")).resolves.toEqual(
    "Código Fonte TV",
  );
});
