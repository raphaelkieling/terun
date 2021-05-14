import { MustacheEngine } from '../../core/engines/MustacheEngine';
import RenderEngineFactory from '../../core/factories/RenderEngineFactory';
import { EngineType, IRenderEngine } from '../../core/interfaces';

describe('Render Mustache:', () => {
    let render: IRenderEngine;
    let tags: string[];

    beforeAll(() => {
        render = RenderEngineFactory.make(EngineType.MUSTACHE);
        tags = ['{{', '}}'];
    });

    it('should be a instance of Render', () => {
        expect(render).toBeInstanceOf(MustacheEngine);
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
        const rendered = await render.render(
            `{{object.name}}`,
            {
                object: { name: 'Something Else' },
            },
            tags,
        );
        expect(rendered).toBe('Something Else');
        done();
    });

    it('should be empty when has only a mustache without args', async (done) => {
        const rendered = await render.render('{{empty}}', {}, tags);
        expect(rendered).toBe('');
        done();
    });
});
