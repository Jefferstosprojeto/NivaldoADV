import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "./blog";

describe("blog loader", () => {
  it("lists all posts sorted by date, newest first", () => {
    const posts = getAllPosts();
    expect(posts.length).toBe(2);
    expect(posts[0].slug).toBe("divorcio-consensual");
    expect(posts[1].slug).toBe("inventario-extrajudicial");
  });

  it("returns the parsed post content by slug", () => {
    const post = getPostBySlug("inventario-extrajudicial");
    expect(post).toBeDefined();
    expect(post!.title).toBe(
      "Quando é possível fazer inventário extrajudicial?"
    );
    expect(post!.html).toContain("<p>");
    expect(post!.html).toContain("inventário extrajudicial");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });
});
