import { IRenderEngine } from "../src/types/interfaces/IRenderEngine";
import { MustacheEngine } from "../src/types/render/MustacheEngine";
import RenderEngineFactory from "../src/types/render/RenderEngineFactory";

describe("Render:", () => {
  let render: IRenderEngine;
  let tags: string[];

  beforeAll(() => {
    render = RenderEngineFactory.createMustache();
    tags = ['{{', '}}']
  });

  it("should be a instance of Render", () => {
    expect(render).toBeInstanceOf(MustacheEngine);
  });

  it("should render 'Something'", () => {
    const rendered = render.render(`Something`, {}, tags);
    expect(rendered).toBe("Something");
  });

  it("should render 'Something Else' when pass {{name}} with object", () => {
    const rendered = render.render(`{{name}}`, { name: "Something Else" }, tags);
    expect(rendered).toBe("Something Else");
  });

  it("should render 'Something Else' when pass {{object.name}} with object", () => {
    const rendered = render.render(`{{object.name}}`, {
      object: { name: "Something Else" },
    }, tags);
    expect(rendered).toBe("Something Else");
  });

  it("should be empty when has only a mustache without args", () => {
    const rendered = render.render("{{empty}}", { empty: 'oi' }, tags);
    expect(rendered).toBe("");
  });
});
