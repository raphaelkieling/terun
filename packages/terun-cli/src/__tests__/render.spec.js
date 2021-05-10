"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MustacheEngine_1 = require("../types/engines/MustacheEngine");
const RenderEngineFactory_1 = __importDefault(require("../types/factories/RenderEngineFactory"));
describe('Render Mustache:', () => {
    let render;
    let tags;
    beforeAll(() => {
        render = RenderEngineFactory_1.default.createMustache();
        tags = ['{{', '}}'];
    });
    it('should be a instance of Render', () => {
        expect(render).toBeInstanceOf(MustacheEngine_1.MustacheEngine);
    });
    it('should be a Promise instance when i gonna render', () => {
        expect(render.render('', {}, tags)).toBeInstanceOf(Promise);
    });
    it("should render 'Something'", async (done) => {
        const rendered = await render.render(`Something`, {}, tags);
        expect(rendered).toBe('Something');
        done();
    });
    it("should render 'Something Else' when receive {{name}} with object", async (done) => {
        const rendered = await render.render(`{{name}}`, { name: 'Something Else' }, tags);
        expect(rendered).toBe('Something Else');
        done();
    });
    it("should render 'Something Else' when receive {{object.name}} with object", async (done) => {
        const rendered = await render.render(`{{object.name}}`, {
            object: { name: 'Something Else' },
        }, tags);
        expect(rendered).toBe('Something Else');
        done();
    });
    it('should be empty when has only a mustache without args', async (done) => {
        const rendered = await render.render('{{empty}}', {}, tags);
        expect(rendered).toBe('');
        done();
    });
});
