import { IRenderEngine } from "../src/types/interfaces/IRenderEngine";
import { MustacheEngine } from "../src/types/render/MustacheEngine";
import RenderEngineFactory from "../src/types/render/RenderEngineFactory";

describe("Render:", () => {
  let render: IRenderEngine;

  beforeAll(() => {
    render = RenderEngineFactory.createMustache();
  });

  it("should be a instance of Render", () => {
    expect(render).toBeInstanceOf(MustacheEngine);
  });

  it("should render 'Something'", () => {
    const rendered = render.render(`Something`, {});
    expect(rendered).toBe("Something");
  });

  it("should render 'Something Else' when pass {{name}} with object", () => {
    const rendered = render.render(`{{name}}`, { name: "Something Else" });
    expect(rendered).toBe("Something Else");
  });

  it("should render 'Something Else' when pass {{object.name}} with object", () => {
    const rendered = render.render(`{{object.name}}`, {
      object: { name: "Something Else" },
    });
    expect(rendered).toBe("Something Else");
  });

  it("should be empty when has only a mustache without args", () => {
    const rendered = render.render("{{empty}}", {});
    expect(rendered).toBe("");
  });
});