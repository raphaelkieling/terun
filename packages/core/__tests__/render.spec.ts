import Render from "../src/render";

describe("Render:", () => {
  let render: Render;

  beforeAll(() => {
    render = new Render();
  });

  it("should be a instance of Render", () => {
    expect(render).toBeInstanceOf(Render);
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
